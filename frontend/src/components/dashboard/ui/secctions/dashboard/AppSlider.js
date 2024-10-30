'use client'
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const AppSlider = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleSliderChange = (_, newIndex) => {
        setSliderIndex(newIndex);
    };

    const handleDotClick = (index) => {
        setSliderIndex(index);
        sliderRef.current.slickGoTo(index); // Cambiar al índice específico
    };


    const PrevArrow = () => (
        <IconButton aria-label="arrow-back" onClick={() => sliderRef.current.slickPrev()} sx={{ color: '#FFFFFF' }}>
            <IoIosArrowBack/>
        </IconButton>
    );

    const NextArrow = () => (
        <IconButton aria-label="arrow-forward" onClick={() => sliderRef.current.slickNext()} sx={{ color: '#FFFFFF' }}>
            <IoIosArrowForward/>
        </IconButton>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        beforeChange: handleSliderChange,
    };

    const slidesData = [
        {
            title: "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
            description: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            image: "/images/cover-1.webp",
        },
        {
            title: "Mental Health in the Digital Age: Navigating Social Media and Well-being",
            description: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
            image: "/images/cover-2.webp",
        },
        {
            title: "Understanding Blockchain Technology: Beyond Cryptocurrency",
            description: 'EThe children giggled with joy as they ran through the sprinklers on a hot summer day.',
            image: "/images/cover-3.webp",
        },
    ];

    return (
        <Card sx={{ position: 'relative', borderRadius: '16px', zIndex: '0' }}>
            <Slider {...settings} ref={sliderRef} >
                {slidesData.map((slide, index) => (
                    <Box key={index} sx={{ position: 'relative'}}>
                        <Stack
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                gap: '8px',
                                p: '24px',
                                width: '100%',
                                bottom: '0px',
                                zIndex: '9',
                                textAlign: 'left',
                                color: 'rgb(255, 255, 255)',
                                
                            }}
                        >
                            <Typography variant="overline" color="rgba(56, 189, 248)">
                                Featured App
                            </Typography>
                            <Typography component="a" variant="inherit" color="white">
                                <Typography variant="h5" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {slide.title}
                                </Typography>
                            </Typography>
                            <Typography component="p" variant="body2" color="white">
                                {slide.description}
                            </Typography>
                        </Stack>
                        <Box component="span" sx={{ overflow: 'hidden', position: 'relative', verticalAlign: 'bottom', display: 'inline-block', width: '100%' }} height={{ xs: '280px', lg: '320px' }}>
                            <Box component={'span'} sx={{
                                top:0,
                                left:0,
                                zIndex:1,
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                background:'linear-gradient(to bottom, rgba(0 0 0 / 0) 0%, #000000 80%)'
                            }}/>
                            <Box component="img" src={slide.image} alt={slide.title} width="100%" height="100%" sx={{ objectFit: 'cover', verticalAlign: 'bottom' }} />
                        </Box>
                    </Box>
                ))}
            </Slider>
            <Stack direction="row" spacing={2} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
                <PrevArrow />
                <NextArrow />
            </Stack>
            <Box
                component="ul"
                sx={{
                    zIndex: '9',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: '16px',
                    left: '16px',
                    position: 'absolute',
                    color: 'rgb(104, 205, 249)',
                }}
            >
                {slidesData.map((_, index) => (
                    <Box key={index} onClick={() => handleDotClick(index)} sx={{ width: '18px', height: '18px', opacity: index === sliderIndex ? 1 : 0.32, cursor: 'pointer' }}>
                        <Stack sx={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                            <Typography sx={{ width: '8px', height: '8px', borderRadius: '50%', transition: 'width 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms', backgroundColor: 'rgba(56, 189, 248, 1)' }} />
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default AppSlider;
