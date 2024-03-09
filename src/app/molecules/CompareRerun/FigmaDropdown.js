import React, { useState } from "react";

const FigmaDropdown = ({  }) => {
    return (
        <div style={{width: '100%', height: '100%', position: 'absolute'}}>
        <div style={{width: 229, height: 101, left: 0, top: 0, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12)', borderRadius: 5, border: '0.50px white solid'}} />
        <div style={{width: 30.88, height: 16.25, left: 190, top: 39, position: 'absolute', background: '#D9D9D9', borderRadius: 2}} />
        <div style={{width: 211.25, height: 16.25, left: 9.88, top: 75.50, position: 'absolute'}}>
            <div style={{width: 30.88, height: 16.25, left: 180.12, top: -0.50, position: 'absolute', background: '#D9D9D9', borderRadius: 2}} />
            <div style={{width: 82.88, height: 3.25, left: 84.50, top: 6.50, position: 'absolute', background: '#D9D9D9', borderRadius: 5}} />
            <div style={{width: 61, height: 3, left: 85, top: 6.50, position: 'absolute', background: '#1A3059', borderRadius: 5}} />
            <div style={{width: 9.75, height: 9.75, left: 140.88, top: 3.25, position: 'absolute', background: '#1A3059', borderRadius: 9999}} />
            <div style={{width: 22, height: 10, left: 185, top: 3, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>2.0<br/></div>
            <div style={{width: 67, height: 10, left: 0, top: 3, position: 'absolute', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Temperature</div>
        </div>
        <div style={{width: 211.25, height: 16.25, left: 9.88, top: 57.25, position: 'absolute'}}>
            <div style={{width: 30.88, height: 16.25, left: 180.12, top: -0.25, position: 'absolute', background: '#D9D9D9', borderRadius: 2}} />
            <div style={{width: 82.88, height: 3.25, left: 84.50, top: 6.50, position: 'absolute', background: '#D9D9D9', borderRadius: 5}} />
            <div style={{width: 26, height: 3, left: 85, top: 6.75, position: 'absolute', background: '#1A3059', borderRadius: 5}} />
            <div style={{width: 9.75, height: 9.75, left: 105.88, top: 3.25, position: 'absolute', background: '#1A3059', borderRadius: 9999}} />
            <div style={{width: 22, height: 10, left: 185, top: 3, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>0.8</div>
            <div style={{width: 67, height: 10, left: 0, top: 3, position: 'absolute', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Top P</div>
        </div>
        <div style={{width: 211.25, height: 16.25, left: 9.88, top: 39, position: 'absolute'}}>
            <div style={{width: 82.88, height: 3.25, left: 84.50, top: 6.50, position: 'absolute', background: '#D9D9D9', borderRadius: 5}} />
            <div style={{width: 43.88, height: 3.25, left: 84.50, top: 6.50, position: 'absolute', background: '#1A3059', borderRadius: 5}} />
            <div style={{width: 9.75, height: 9.75, left: 121.88, top: 3.25, position: 'absolute', background: '#1A3059', borderRadius: 9999}} />
            <div style={{width: 22, height: 10, left: 185, top: 3, position: 'absolute', textAlign: 'right', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>5</div>
            <div style={{width: 67, height: 10, left: 0, top: 3, position: 'absolute', color: 'black', fontSize: 8, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Top K</div>
        </div>
        <div style={{width: 104, height: 23, left: 10, top: 7, position: 'absolute'}}>
            <div style={{width: 104, height: 23, left: 0, top: 0, position: 'absolute', background: '#1A3059', borderRadius: 20}} />
            <div style={{width: 74.12, height: 14, left: 16, top: 5, position: 'absolute'}}>
                <div style={{width: 14, height: 11.45, left: 0, top: 12.45, position: 'absolute'}}>
                    <div style={{width: 7.62, height: 6.37, left: 0, top: -5.08, position: 'absolute', background: 'white'}}></div>
                    <div style={{width: 7.63, height: 6.35, left: 6.37, top: 0, position: 'absolute', background: 'white'}}></div>
                </div>
                <div style={{width: 53, height: 14, left: 21.12, top: 0, position: 'absolute', color: 'white', fontSize: 10, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Compare</div>
            </div>
        </div>
        <div style={{width: 89, height: 23, left: 132, top: 7, position: 'absolute'}}>
            <div style={{width: 89, height: 23, left: 0, top: 0, position: 'absolute', background: '#1A3059', borderRadius: 20}} />
            <div style={{width: 53.73, height: 14.38, left: 20, top: 5, position: 'absolute'}}>
                <div style={{width: 11, height: 11, left: 0, top: 1, position: 'absolute', background: 'white'}}></div>
                <div style={{width: 35, height: 14.38, left: 18.73, top: 0, position: 'absolute', color: 'white', fontSize: 10, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Rerun</div>
            </div>
        </div>
        </div>
    );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
  },
  sliderContainer: {
    margin: "10px 0",
  },
};

export default FigmaDropdown;


//export default FigmaDropdown;