import React, { useState, useEffect } from "react";
import Search from './Search/Search';
import './Face.css';
import { useSelector } from "react-redux";
import { selectFacesStore, selectFacesError,selectNewDetectedFaces, selectFacesFamous, selectFacesGender, selectFacesAge } from "../../store/faces/faces.selectors";
import { useDispatch } from "react-redux";
import { facesCounter } from "../../store/faces/faces.actions";
import { fetchCategoriesStartAsync } from "../../store/faces/faces.actions";

const Face = () => {
    const dispatch = useDispatch();
    const faceFetchError = useSelector(selectFacesError);
    const [copiedFaces, setCopiedFaces] = useState(null);
    const [isSearched, setIsSearched] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [search, setSearch] = useState('');
    const newDetectedFaces = useSelector(selectNewDetectedFaces);
    const age = useSelector(selectFacesAge);
    const famous = useSelector(selectFacesFamous);
    const gender = useSelector(selectFacesGender);
    const [box, setBox] = useState({ topRow: 0, leftCol: 0, bottomRow: 0, rightCol: 0 });

    useEffect(() => {
        window.addEventListener('resize', simulateClick);
        document.addEventListener('fullscreenchange', simulateClick);
        document.addEventListener('webkitfullscreenchange', simulateClick);
        return () => {
            window.removeEventListener('resize', simulateClick);
            document.removeEventListener('fullscreenchange', simulateClick);
            document.removeEventListener('webkitfullscreenchange', simulateClick);
        }
    }, []
    );
    useEffect(() => {
        setIsSearched(true);
    }, [newDetectedFaces]);
    useEffect(() => {
        faceFetchError && console.log('error fetching faces: ',faceFetchError);
    }, [faceFetchError]);
    useEffect(()=>{
        isSearched && markFaces();
    },[isSearched]);

    const simulateClick = () => {
        const faceMark = document.getElementById('facemark');
        console.log('click--------');
        setTimeout(()=>{faceMark.click();},100);  
      }
   /*  let timeoutId = null; */
    const markFaces = () => {
        console.log('orginal: ', newDetectedFaces);

              try {
                displayFaceBox(calculateFaceLocation(newDetectedFaces));
              } catch (error) {
                console.log('Failed to calculate face location: ' + error.message)
              }
    }

    const calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log('face Calc ',data);
        return (isNaN(width) || isNaN(height) || isNaN(data.left_col)) ?
            {} :
            {
                leftCol: data.left_col * width,
                topRow: data.top_row * height,
                rightCol: width - (data.right_col * width),
                bottomRow: height - (data.bottom_row * height)
            }
    }

    const displayFaceBox = (newBox) => {
        setBox(newBox);
    }
    const onSearchChange = event => {
        setSearch(event.target.value);
    }
    const onButtonSubmit = () => {
        console.log('dispara');
        setImageURL(search);
        setSearch('');
        setBox({});
        setIsSearched(false);
        dispatch(fetchCategoriesStartAsync(search))
    }

    const handleImageError = () => {
        setImageURL('');
        setSearch('');
    }

    return (

        <div className="container mx-auto w-75 p-3 rounded">

            {imageURL === '' ? <div></div> :
                <div className="d-flex flex-column border border-2 border-primary flex-md-row bg-light p-4 justify-content-around-md rounded mb-3">
                    <div className="col-12 col-md-6 col-lg-6 position-relative">
                        <img id='inputimage' alt='' src={imageURL} onError={handleImageError} width='100%' heigh='auto' />
                        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
                        </div>
                    </div>
                    {isSearched && (
                        <div className="card border-0 bg-light px-md-4 col-md-6 col-lg-6 col-12">
                            <div className="card-body bg-info">
                                <h5 className="card-title">The famous is:</h5>
                                <p className="card-text">{famous}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Gender: {gender}</li>
                                <li className="list-group-item">Age: {age}</li>
                            </ul>
                        </div>
                    )}
                </div>
            }
            <button id='facemark'className="d-none" onClick={()=>{console.log('del boton',newDetectedFaces); markFaces();}}></button>
            <Search onButtonSubmit={onButtonSubmit} searchValue={search} onSearchChange={onSearchChange} />
        </div>
    );
}

export default Face;
