import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react';
import {Typography, Paper, useMediaQuery, Box} from "@material-ui/core";
import {LocationOnOutlined} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";

import useStyle from './style'
import {Marker} from "@react-google-maps/api";



export function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
    const classes = useStyle();
    const isMobile = useMediaQuery('(min-width:600px)')

    const AnyReactComponent = ({ text, className, lat, lng, key }) => <div lat={lat} lng={lng} key={key} className={className}>{text}</div>;

    return (
        <Box className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI: true, zoomControl: true}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?.map((place, index) => (
                    // <div
                    //     className={classes.markerContainer}
                    //     lat={Number(place.latitude)}
                    //     lng={Number(place.longitude)}
                    //     key={index}
                    // >
                    //     { !isMobile ? (<LocationOnOutlined color='primary' fontSize='large'/>) :
                    //         (<Paper elevation={3} className={classes.paper}>
                    //             <Typography className={classes.typography} variant='subtitle2' variant='subtitle2'>{place.name}</Typography>
                    //             <img className={classes.pointer}
                    //             src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    //             alt={place.name}
                    //             />
                    //             <Rating size='small' value={Number(place.rating)} readOnly/>
                    //         </Paper>)}
                    // </div>
                    <AnyReactComponent
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={index}
                    text={  !isMobile ? (<LocationOnOutlined color='primary' fontSize='large'/>) :
                    (<Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle2' variant='subtitle2'>{place.name}</Typography>
                    <img className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                    />
                    <Rating size='small' value={Number(place.rating)} readOnly/>
                    </Paper>) }
                    />
                ))}
            </GoogleMapReact>
        </Box>
    );
}