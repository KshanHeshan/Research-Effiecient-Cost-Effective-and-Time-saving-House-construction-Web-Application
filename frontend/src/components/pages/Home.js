import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CarouselImage01 from '../css/img/Carousel/carousel_img_1.png';
import CarouselImage02 from '../css/img/Carousel/carousel_img_2.png';
import ServiceImage01 from '../css/img/Services/customer-satisfaction.png';
import ServiceImage02 from '../css/img/Services/quality-service.png';
import ServiceImage03 from '../css/img/Services/trustworthy.png';
import FeaturetteImage01 from '../css/img/Featurette/construction-1.png';
import FeaturetteImage02 from '../css/img/Featurette/construction-2.png';
import FeaturetteImage03 from '../css/img/Featurette/construction-3.png';
import FeaturetteImage04 from '../css/img/Featurette/construction-4.png'; 
import '../css/custom.css';
// import '../js/aos.js';

class Home extends Component {
    render() {
        return (
            <main className="main-nopaddingUp">

                    {/* Featurette Strats here */}

                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="carousel-img" src={CarouselImage01} alt="" />
                                <div className="container">
                                <div className="carousel-caption text-left">
                                    <h1>Excellence in work</h1>
                                    <p>Working with professionals will garuntee you the best of the work for building your dream house.</p>
                                    <p><a className="btn btn-primary" href="/#" role="button">Sign up today</a></p>
                                </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="carousel-img" src={CarouselImage02} alt=""/>
                                <div className="container">
                                <div className="carousel-caption">
                                    <h1>Another example headline.</h1>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                    <p><a className="btn btn-primary" href="/#" role="button">Learn more</a></p>
                                </div>
                                </div>
                            </div>
                        <div className="carousel-item">
                            <img className="carousel-img" src={CarouselImage01} alt=""/>
                            <div className="container">
                            <div className="carousel-caption text-right">
                                <h1>One more for good measure.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-primary" href="/#" role="button">Browse gallery</a></p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <a className="carousel-control-prev" href="/#" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="/#" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <br/>
                    <hr/>
                    <br/>
                    {/* <!-- Marketing messaging and featurettes
                    ================================================== -->
                    <!-- Wrap the rest of the page in another container to center all the content. --> */}

                    <div className="container marketing">

                        {/* <!-- Three columns of text below the carousel --> */}
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="text-center">
                                    <img src={ServiceImage01} width="150" height="150"/>
                                </div>
                                <br/>
                                <h2 className="text-center">Trustworthy</h2>
                                <br/>
                                <p className="text-justify">
                                    Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.
                                </p>
                                <div className="text-center">
                                    <a className="btn btn-outline-danger" href="/#">View details »</a>
                                </div>
                            </div>
                            {/* <!-- /.col-lg-4 --> */}

                            <div className="col-lg-4">
                                <div className="text-center">
                                    <img src={ServiceImage03} width="180" height="150"/>
                                </div>
                                <br/>
                                <h2 className="text-center">Higher Satisfaction</h2>
                                <br/>
                                <p className="text-justify">
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.
                                </p>
                                <div className="text-center">
                                    <a className="btn btn-outline-danger" href="/#">View details »</a>
                                </div>
                            </div>
                            {/* <!-- /.col-lg-4 --> */}

                            <div className="col-lg-4">
                                <div className="text-center">
                                    <img src={ServiceImage02} width="180" height="150"/>
                                </div>
                                <br/>
                                <h2 className="text-center">Excellent Service</h2>
                                <br/>
                                <p className="text-justify">
                                    Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo.
                                </p>
                                <div className="text-center">
                                    <a className="btn btn-outline-danger" href="/#">View details »</a>
                                </div>
                            </div>
                            {/* <!-- /.col-lg-4 --> */}
                        </div>
                        {/* <!-- /.row --> */}
                        <br/>
                        <hr/>
                        <br/>

                        {/* <!-- START THE FEATURETTES --> */}
                        <section className="cardSection">
                            <img src={FeaturetteImage01} alt=""/>
                            <div>
                                <h3><span>Professional</span> Personals</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Molestias cupiditate culpa repellendus deleniti voluptatem
                                    error reprehenderit, veritatis modi 
                                    enim nesciunt!
                                </p>
                                <a href="/#" className="btn btn-outline-danger">View</a>
                            </div>
                        </section>
                        <section className="cardSection">
                            <img src={FeaturetteImage02} alt=""/>
                            <div>
                                <h3><span>Prediction </span> of Total Building Cost</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Molestias cupiditate culpa repellendus deleniti voluptatem
                                    error reprehenderit, veritatis modi 
                                    enim nesciunt!
                                </p>
                                <a href="/#" className="btn btn-outline-danger">View</a>
                            </div>
                        </section>
                        <section className="cardSection">
                            <img src={FeaturetteImage03} alt=""/>
                            <div>
                                <h3>Perfect <span>Management</span></h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Molestias cupiditate culpa repellendus deleniti voluptatem
                                    error reprehenderit, veritatis modi 
                                    enim nesciunt!
                                </p>
                                <a href="/#" className="btn btn-outline-danger">View</a>
                            </div>
                        </section>
                        <section className="cardSection">
                            <img src={FeaturetteImage04} alt=""/>
                            <div>
                                <h3>Process <span>Track</span></h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Molestias cupiditate culpa repellendus deleniti voluptatem
                                    error reprehenderit, veritatis modi 
                                    enim nesciunt!
                                </p>
                                <a href="/#" className="btn btn-outline-danger">View</a>
                            </div>
                        </section>
                        
                        {/* <!-- /END THE FEATURETTES --> */}

                    </div>
                    {/* <!-- /.container --> */}
                {/* </section> */}

            {/* Featurette Ends Here */}
            </main>
        );
    }
}

export default Home;
