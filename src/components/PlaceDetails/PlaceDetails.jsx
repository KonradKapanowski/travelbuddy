import React from 'react'
import{ Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from "@material-ui/core";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@material-ui/lab/Rating'

import useStyles from './style';

export function PlaceDetails({place, selected, refProp}) {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})

    return (
        <Card elevation={6}>
            <CardMedia
                style={{height: 350}}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography variant='h5' gutterBottom>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Rating  value={Number(place.rating)} readOnly/>
                    <Typography variant='subtitle1' gutterBottom> Out of{place.num_reviews} reviews</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography variant='subtitle1' gutterBottom>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle2'>Ranking</Typography>
                    <Typography variant='subtitle2' gutterBottom>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award, index) => (
                    <Box my={1} display='flex' justifyContent='space-between' key={index}>
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant='subtitle2' color='textSecondary'>
                            {award.display_name}
                        </Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({name}) => (
                    <Chip key={name} size='small' label={name} className={classes.chip}/>
                ))}
                {place?.address && (
                    <Typography variant='body2' color='textSecondary' className={classes.subtitle} gutterBottom>
                        <LocationOnIcon/>{place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography variant='body2' color='textSecondary' className={classes.subtitle} gutterBottom>
                        <PhoneIcon/>{place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' variant='contained' color='primary' onClick={()=> window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size='small' variant='contained' color='primary' onClick={()=> window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}