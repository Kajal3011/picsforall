import React from 'react'
import { NavLink } from 'react-router-dom';

const listItems = [
    { slug: "wallpapers", title: "Wallpapers", description: 'From epic drone shots to inspiring moments in nature — submit your best desktop and mobile backgrounds.' },
    { slug: "3d-renders", title: "3D Renders", description: 'The Unsplash community continues to push the boundaries of creativity through 3D Renders. From abstract worlds to photo-realistic interiors, this category celebrates exciting 3-dimensional images designed in the software of your choice and rendered into JPEG images.' },
    { slug: "nature", title: "Nature", description: 'Through photography, the beauty of Mother Nature can be frozen in time. This category celebrates the magic of our planet and beyond — from the immensity of the great outdoors, to miraculous moments in your own backyard.' },
    { slug: "travel", title: "Travel", description: 'Discover hidden wonders and inspiring destinations around the world from the comfort of your own home.' },
    { slug: "architecture-interior", title: "Architecture & Interiors", description: 'Exploring our built environments — from brutalist buildings to eccentric home decor. This category showcases the best of architecture and interiors from around the world.' },
    { slug: "street-photography", title: "Street Photography", description: 'When the streets around you become your canvas, what can you discover? From quiet passages in charming towns to the hustle and bustle of larger cities — this category examines street photography in every form.' },
    { slug: "textures-patterns", title: "Textures & Patterns", description: 'Whether you’re looking for stunning macro-photography or shots of complex architectural shapes — you’ve come to the right place.' },
    { slug: "business-work", title: "Business & Work", description: 'Reflecting the realities of the modern workplace in their many forms — from images of remote working and start-ups to shots of engineers and artists at work.' },
    { slug: "arts-culture", title: "Arts & Culture", description: 'Your daily dose of culture — with photography showcasing the best in art, music and literature from around the world.' },
    { slug: "current-events", title: "Current Events", description: 'Photographs influence how we understand the world around us. This category is all about capturing those news-worthy moments around the globe — from political protests to cultural celebrations. When submitting, please provide a photo description so we understand the full context of the image.' },
    // { slug: "film", title: "Film"},
    // { slug: "animals", title: "Animals"},
    { slug: "health", title: "Health & Wellness", description: 'Celebrate a healthy mind, body and soul with photographs that showcase everything from new medical discoveries and alternative medicines, to healthy eating and meditation.' }
    // { slug: "fashion-beauty", title: "Fashion & Beauty"},
    // { slug: "greener-cities", title: "Greener Cities"},
    // { slug: "experimental", title: "Experimental"},
    // { slug: "people", title: "People"},
    // { slug: "food-drink", title: "Food & Drink"},
    // { slug: "spirituality", title: "Spirituality"},
    // { slug: "athletics", title: "Athletics"}
];

function Navbar() {

    return (
        <nav>
            <h3></h3>
            <NavLink
                className={({ isActive }) => isActive ? 'active-topic topic-link' : 'topic-link'}
                to={'/'}
            >
                Editorial
            </NavLink>

            <span> <strong> | </strong> </span>

            {
                listItems.map((val, index) => {
                    return <NavLink
                        className={({ isActive }) => isActive ? 'active-topic topic-link' : 'topic-link'}
                        key={index}
                        // to={`/t/${val.slug}`
                        to={`./x/#`}
                        state={val}
                    >
                        {val.title}
                    </NavLink>
                })
            }
            {/* <br /> */}
            {/* <hr /> */}
        </nav>
    )
}

export default Navbar