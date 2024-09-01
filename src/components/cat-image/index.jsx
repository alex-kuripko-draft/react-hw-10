import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './cat-image.module.css';

const CatImage = () => {
    const [catImage, setCatImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCatImage = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            setCatImage(response.data[0].url);
        } catch (error) {
            console.log('Error fetching the cat image!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []);

    if (loading) {
        return <span className={styles.loader}></span>
    }

    if (!catImage) {
        return <p>Can't load image!</p>
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Random Cat Image</h1>
            <img src={catImage} alt="random cat" className={styles.catImage}/>
            <button onClick={fetchCatImage} className={styles.button}>Load New Image</button>
        </div>
    );
};

export default CatImage;