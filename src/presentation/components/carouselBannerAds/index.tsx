import React, { useEffect, useRef, useState, Fragment } from 'react'
import { View } from 'react-native'
import { styles } from './styles'
import BannerRefonte from '../BannerRefonte'
import CarouselBanner from '../CarouselBanner'
import { useSelector } from 'react-redux'
import { UserSA } from '../../../service/applicatif/User.sa'

interface CarouselBannerAdsProps {
    isStyled?: boolean
}

type Advertisement = {
    id?: string | number
    [key: string]: any
}

const REFRESH_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes
const INITIAL_PLACEHOLDER_MS = 5300 // 5.3 seconds like in original

const CarouselBannerAds = ({ isStyled = true }: CarouselBannerAdsProps) => {
    // On suppose que auth slice contient accessToken
    const { accessToken } = useSelector(({ auth }: any) => auth);

    // Storer la sortie de UserSA dans un ref pour garder une référence stable
    const userSARef = useRef(UserSA())

    const [start, setStart] = useState<boolean>(true) // placeholder visible au début
    const [carousel, setCarousel] = useState<Advertisement[] | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const timeoutRef = useRef<number | null>(null)
    const intervalRef = useRef<number | null>(null)
    const firstLoadRef = useRef<boolean>(true)
    const abortControllerRef = useRef<AbortController | null>(null)

    // utilitaire de comparaison simple des items (par id si présent, sinon fallback JSON)
    const areItemsEqual = (a?: Advertisement[], b?: Advertisement[]) => {
        if (!a && !b) return true
        if (!a || !b) return false
        if (a.length !== b.length) return false

        const aHasIds = a.every(item => item && (item.id !== undefined))
        const bHasIds = b.every(item => item && (item.id !== undefined))

        if (aHasIds && bHasIds) {
            const aIds = a.map(i => String(i.id)).sort().join('|')
            const bIds = b.map(i => String(i.id)).sort().join('|')
            return aIds === bIds
        }

        // fallback (moins optimal mais robuste)
        try {
            return JSON.stringify(a) === JSON.stringify(b)
        } catch {
            return false
        }
    }

    const getAllBanners = async () => {
        // si pas de token, on évite d'appeler l'API (adapter selon ton besoin)
        if (!accessToken) return

        // annuler éventuelle requête précédente
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        const controller = new AbortController()
        abortControllerRef.current = controller

        setLoading(true)
        setError(null)

        try {
            const dataBanner = {
                category: 'banner',
                audience: 0,
            }
            const responseBanner = await userSARef.current.getAdvertisementsByCategory(dataBanner, accessToken)

            const items: Advertisement[] | undefined = responseBanner?.data?.items

            // si on a des items et qu'ils sont nouveaux -> update
            if (items && items.length) {
                if (!areItemsEqual(items, carousel)) {
                    setCarousel(items)
                }
                // si c'est le premier chargement on garde le placeholder pendant INITIAL_PLACEHOLDER_MS
                if (firstLoadRef.current) {
                    // nettoyer ancien timeout s'il existe
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore setTimeout retourne number dans l'environnement RN/web
                    timeoutRef.current = setTimeout(() => {
                        setStart(false)
                        timeoutRef.current = null
                    }, INITIAL_PLACEHOLDER_MS) as unknown as number
                    firstLoadRef.current = false
                }
            } else {
                // pas d'items : tu peux décider de vider le carousel ou laisser l'ancien
                // ici on ne remplace pas si tableau vide — on garde l'existant
            }
        } catch (err: any) {
            if (err?.name === 'AbortError') {
                // requête annulée — rien à faire
            } else {
                console.warn('Erreur getAllBanners:', err)
                setError(err?.message ?? 'Erreur lors de la récupération des bannières')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // lancement initial + installation d'un intervalle pour refetch toutes les 30 minutes
        // on relance la récupération si accessToken change (par ex. login)
        getAllBanners()

        // installer intervalle de refetch
        // clear interval existant (au remontage possible)
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore setInterval retourne number
        intervalRef.current = setInterval(() => {
            getAllBanners()
        }, REFRESH_INTERVAL_MS) as unknown as number

        // cleanup à l'unmount ou quand accessToken change
        return () => {
            // clear timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            // clear interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            // abort active request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
                abortControllerRef.current = null
            }
        }
    }, [accessToken])

    return (
        <Fragment>
            {carousel && !start ? (
                <View style={styles.carouselBanner}>
                    <CarouselBanner
                        data={carousel.map((ad) => ({
                            link: ad.link ?? '',
                            image: ad.image ?? '',
                            ...ad,
                        }))}
                    />
                </View>
            ) : (
                <BannerRefonte _customStyle={isStyled ? { borderRadius: 10 } : {}} />
            )}
        </Fragment>
    )
}

export default CarouselBannerAds