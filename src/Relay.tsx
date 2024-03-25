import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Relay = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [previousWord, setPreviousWord] = useState('');
    const [message, setMessage] = useState('');
    const [isFirstWord, setIsFirstWord] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentWord(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://krdict.korean.go.kr/api/search', {
                params: {
                    key: 'D2C9174701A6D6EB8EBA17A752D09600',
                    q: currentWord,
                    pos: '1',
                    method: 'exact',
                    sort: 'popular',
                    letter_sense: 'n',
                    start: '1',
                    num: '10',
                    advanced: 'y',
                    trans_lang: '1',
                },
            });

            const searchData = response.data;

            if (searchData.item) {
                if (isFirstWord || currentWord.charAt(0) === previousWord.slice(-1)) {
                    setPreviousWord(currentWord);
                    setCurrentWord('');
                    setMessage('');
                    setIsFirstWord(false);
                } else {
                    setMessage('올바른 단어를 입력하세요!');
                }
            } else {
                setMessage('유효하지 않은 단어입니다!');
            }
        } catch (error) {
            console.error('API 호출 중 에러 발생:', error);
            setMessage('단어 검증 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="App">
            <h1>끝말잇기 게임</h1>
            <p>이전 단어: {previousWord}</p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={currentWord} onChange={handleChange} />
                <button type="submit">제출</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Relay;