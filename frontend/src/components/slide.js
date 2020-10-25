import React from 'react';
import {Carousel} from 'react-bootstrap';
import slide1 from './slider/slide-01.jpg';
import slide2 from './slider/slide-02.jpg';
import slide3 from './slider/slide-03.jpg';

export default class Slide extends React.Component{

    render(){
        return(
        <section className="section-slide">
            <Carousel>
                <Carousel.Item>
                    <img src={slide1} className='img-fluid'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={slide2} className='img-fluid'/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={slide3} className='img-fluid'/>
                </Carousel.Item>
            </Carousel>
	</section>
        );
    }
}