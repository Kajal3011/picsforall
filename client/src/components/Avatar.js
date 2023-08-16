import React from 'react'

function Avatar(props) {
    function stringToColor(string) {
        let hash = 0, i, color = '#';

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const avatarStyle = {
        height: props.w,
        width: props.w,
        fontSize: `calc(${props.w} * 0.66)`,
        background: stringToColor(props.str.split("").reverse().join("")),
        borderRadius: '50%',
        color: 'white',
        display: 'inline-block',
        textAlign: 'center',
    }

    return (
        <div style={avatarStyle}>
            {props.ch}
        </div>
    )
}

export default Avatar