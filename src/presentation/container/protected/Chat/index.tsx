import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import CombinaisonCandidatScreen from '../../../container/protected/CombinaisonCandidat';
import ChatWip from './ChatWip';

const Chat = () => {
    const { user } = useSelector(({ auth }: any) => auth);
    return (
        <Fragment>
            {user?.role === 'candidate' ? <CombinaisonCandidatScreen /> : <ChatWip />}
        </Fragment>
    )
}

export default Chat
