import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import { ActivityIndicator } from 'react-native';
import { COLORS, images, icons } from '../../../../resources/constants';
import { INSCRIPTION, STRING_ALL, TEXT_INFORMATIONS } from '../../../../data/constants/strings';
import { InscriptionService } from '../../../../service/applicatif/Inscription.sa';
import { HttpStatus } from '../../../../data/constants/Http-status';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleLabels } from './titleLabels';
import CarouselContent from '../../../components/CarouselContent';
import { Toast } from 'primereact/toast';
import { activities } from './secteur';

interface DefaultValuesTypes {
	nif: string;
	stat: string;
	yearOfCreation: string;
	activity: string;
	representing: string;
	headQuarter: string;
	url: string;
	fileUpload: string;
}

const defaultValues: DefaultValuesTypes = {
	nif: '',
	stat: '',
	yearOfCreation: '',
	activity: '',
	representing: '',
	headQuarter: '',
	url: '',
	fileUpload: '',
};

interface ErrorTypes {
	compteur: boolean,
	nif: string,
	stat: string,
	[key: string]: string | boolean;
}

type SetErrorsType = React.Dispatch<React.SetStateAction<ErrorTypes>>;

export const ValidateCompany = (props: any) => {
	const { state } = useLocation();
	const { valuesToPass } = state;
	const [values, setValues] = useState<DefaultValuesTypes>(defaultValues);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorStat, setErrorStat] = useState<boolean>(false);
	const [representing, setRepresenting] = useState<string>('');
	const [errorRepresenting, setErrorRepresenting] = useState(false);
	const [yearOfCreation, setYearOfCreation] = useState('');
	const [errorAnnee, setErrorAnnee] = useState(false);
	const [activity, setActivity] = useState('');
	const [errorActivity, setErrorActivity] = useState(false);
	const [headQuarter, setHeadQuarter] = useState('');
	const [errorHeadQuarter, setErrorHeadQuarter] = useState(false);
	const [fileUpload, setFileUpload] = useState('');
	const [errorFileUpload, setErrorFileUpload] = useState(false);
	const [url, setUrl] = useState('');
	const [errorUrl, setErrorUrl] = useState(false);
	const [error, setError] = useState(STRING_ALL.REQUIRED_FIELD);

	const [errors, setErrors] = useState<ErrorTypes>({
		compteur: false,
		nif: '',
		stat: '',
	});

	const [showError, setShowError] = useState(false);

	const [isChecked, setIsChecked] = useState(false);
	const { postSendEmail } = InscriptionService();

	const navigate = useNavigate();
	const toast = useRef<Toast>(null);
	const noError = (errors: Record<string, any>) => Object.values(errors).every(error => !error);

	useEffect(() => {
		if (!errors.compteur) {
			setErrors((previousState: typeof errors) => ({ ...previousState, compteur: true }));
		} else {
			validation(values, setErrors);
		}
	}, [values]);

	const checkStatValue = (values: DefaultValuesTypes, setErrors: SetErrorsType) => {
		if (
			!/^ ?[0-9]{5} ?[0-9]{2} ?[0-9]{4} ?[0-9] ?[0-9]{5} ?$/.test(values.stat)
		) {
			setErrors(previousState => ({
				...previousState,
				stat: INSCRIPTION.PUT_STAT_VALID,
			}));
		} else {
			setErrors(previousState => ({ ...previousState, stat: '' }));
		}
	};

	const checkNifValue = (values: DefaultValuesTypes, setErrors: SetErrorsType) => {
		if (!/^ ?[0-9]{10} ?$/.test(values.nif)) {
			setErrors(previousState => ({
				...previousState,
				nif: INSCRIPTION.PUT_NIF_VALID,
			}));
		} else {
			setErrors(previousState => ({ ...previousState, nif: '' }));
		}
	};
	const validation = (values: DefaultValuesTypes, setErrors: SetErrorsType) => {
		checkStatValue(values, setErrors);
		checkNifValue(values, setErrors);

		Object.entries(values).forEach(element => {
			if (
				element[1] === '' ||
				element[1] === null ||
				element[1] === 'INVALID INPUT'
			) {
				setErrors(previousState => ({
					...previousState,
					[element[0]]: STRING_ALL.REQUIRED_FIELD,
				}));
			}
		});
	};
	const checkAnnee = () => !yearOfCreation.trim();
	const checkRepresentant = () => !representing.trim();
	const checkActivite = () => !activity.trim();
	const checkHeadQuarter = () => !headQuarter.trim();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		e.preventDefault();
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
		if (name == 'representing') {
			setErrorRepresenting(!(value !== ''));
			setRepresenting(value);
		} else if (name == 'yearOfCreation') {
			setErrorAnnee(!(value !== ''));
			setYearOfCreation(value);
		} else if (name == 'activity') {
			setErrorActivity(!(value !== ''));
			setActivity(value);
		} else if (name == 'headQuarter') {
			setErrorHeadQuarter(!(value !== ''));
			setHeadQuarter(value);
		} else if (name == 'url') {
			setUrl(value);
		}
		else if (name == 'fileUpload' && (e.target as HTMLInputElement).files
		) {
			const file = (e.target as HTMLInputElement).files![0];
			setErrorFileUpload(!file);
			if (file) {
				setFileUpload(`Fichiers selectionné : ${file.name}`);
				setValues({ ...values, [name]: file.name });
			} else {
				setFileUpload("Aucun fichier sélectionné");
			}
		}
	};

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setErrorAnnee(checkAnnee());
		setErrorRepresenting(checkRepresentant());
		setErrorActivity(checkActivite());
		setErrorHeadQuarter(checkHeadQuarter());
		setShowError(noError(errors));

		if (
			!errorStat &&
			!errorAnnee &&
			!errorRepresenting &&
			!errorActivity &&
			!errorHeadQuarter
		) {
			setIsLoading(true);
			const data = {
				email: valuesToPass.email,
				password: valuesToPass.password,
				confirmationPassword: valuesToPass.password,
				name: valuesToPass.entreprise,
				role: valuesToPass.role,
				representing: values.representing,
				yearOfCreation: values.yearOfCreation,
				activity: values.activity,
				url: values.url,
				headQuarter: values.headQuarter,
				carte: values.fileUpload,
			};
			const response = await postSendEmail(data);
			if (response?.status === HttpStatus.ServerError) {
				setIsLoading(false);
				toast.current?.show({ severity: 'error', summary: 'Error', detail: response?.data?.message, life: 3000 });
			} else {
				setIsLoading(false);
				navigate('/inscription/confirmation', { state: { values: data } });
			}
		}
	};

	return (
		<>
			<Toast ref={toast} position='bottom-right' />
			<div className='containerBackground'>
				<div className='containers container'>
					<CarouselContent text={TitleLabels.createAccount.description} />
					<div className='validate'>
						<div className='validate__logo'>
							<img src={images.WipWork} width={164} height={70} alt='logo' />
						</div>
						<div className='validate__formsText'>
							<div className='validate__title'>
								<h1>{TitleLabels.createAccount.valide}</h1>
								<p>Entrez les informations de votre entreprise</p>
							</div>
							<div className='validate__form'>
								<div className='validate__input'>
									<input type='text' placeholder={TitleLabels.ValidateCompany.representant} maxLength={50} onChange={handleChange} value={values.representing} name="representing" required />
									<div className='validate__svg'>
										<img src={icons.immeuble} alt='email' width={15} height={15} />
									</div>
								</div>
								<div className='validate__input'>
									<input className={`${errorAnnee ? 'error ' : ' '}`} type='number' name='yearOfCreation' value={values.yearOfCreation} placeholder={TitleLabels.ValidateCompany.annee} onChange={handleChange} maxLength={4} required />
									<div className='validate__svg'>
										<img src={icons.calendrier} alt='email' width={15} height={15} />
									</div>
									{
										errorAnnee ? (
											<span style={{ color: COLORS.red_color, fontSize: 10 }}>{error}</span>
										) : null
									}
								</div>
							</div>
							<div className='validate__form'>
								<div className='validate__input'>
									<select
										className={`${errorActivity ? 'error' : 'select'}`}
										name='activity'
										value={values.activity}
										onChange={handleChange}
										required
									>
										<option value='' disabled>
											{TitleLabels.ValidateCompany.activity}
										</option>
										{activities.map((item: { value: string; label: string }) => (
											<option key={item.value} value={item.value}>
												{item.label}
											</option>
										))}

									</select>
									{errorActivity && (
										<span style={{ color: COLORS.red_color, fontSize: 10 }}>{error}</span>
									)}
								</div>

								<div className='validate__input'>
									<input className={`${errorHeadQuarter ? 'error' : ' '}`} type='text' name="headQuarter" placeholder={TitleLabels.ValidateCompany.headQuarter} value={values.headQuarter} onChange={handleChange} maxLength={50} required />
									<div className='validate__svg'>
										<img src={icons.quartier} alt='email' width={15} height={15} />
									</div>
									{
										errorHeadQuarter ? (
											<span style={{ color: COLORS.red_color, fontSize: 10 }}>{error}</span>) : null
									}
								</div>
							</div>
							<div className='validate__input'>
								<input className={`${errorUrl ? 'error' : ' '}`} type='text' name="url" placeholder={TitleLabels.ValidateCompany.url} value={values.url} maxLength={50} onChange={handleChange} required />
								<div className='validate__svg'>
									<img src={icons.url} alt='email' width={15} height={15} />
								</div>
								{
									errorUrl ? (
										<span style={{ color: COLORS.red_color, fontSize: 10 }}>{error}</span>) : null
								}
							</div>

							<div className='validate__files'>
								<label htmlFor="fileUpload">
									<img src={icons.plusRound} height={36} width={36} />
									<span style={{ textAlign: 'center' }}>Ajoutez une copie de votre NIF/STAT pour valider votre compte entreprise. (*pdf ,png,jpg,webp)</span>
								</label>
								<input type="file" id="fileUpload" name="fileUpload" accept=".pdf, .png, .jpg, .webp" onChange={handleChange} />
							</div>

							<p className='validate__fileText'>{fileUpload}</p>

							<div className='validate__checkbox'>
								<input type='checkbox' onChange={() => setIsChecked(!isChecked)} />
								<p>{TEXT_INFORMATIONS.ENTERPRISE_CHECKBOX}<a href='https://www.wipwork.com/terms' target='_blank'>Politique de confidentialité</a> à tout moment.</p>
							</div>

							<div className='validate__btn'>
								<button onClick={handleSubmit} disabled={!isChecked}>
									{
										isLoading ? <ActivityIndicator /> : 'Inscription'
									}
								</button>
								<button className='validate__btn--orange' onClick={() => navigate('/inscription')}>
									Annuler
								</button>
							</div>
						</div>
					</div>
				</div >
			</div>
		</>
	);
};
