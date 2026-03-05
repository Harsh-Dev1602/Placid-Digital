import React from 'react'
import styled from 'styled-components';
import { LuPhoneCall } from "react-icons/lu";

function Call() {
  return (
    <>
      <StyledWrapper>
        <div className=" container  fixed bottom-5 right-5 card">
          <ul>

            <li className="iso-pro ">
              <span  className='bg-white'/>
              <span  className='bg-white'/>
              <span  className='bg-white'/>
              <a href='tel:+919589274777'>
                <div className="svg bg-white">
                  <LuPhoneCall />
                </div>
              </a>
              <div className="text  font-bold">Call us</div>
            </li>

          </ul>
        </div>
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  .card {
    max-width: fit-content;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    gap: 1rem;   
  }

  .card:hover {
    animation: ease-out 5s;
    background: rgba(173, 173, 173, 0.05);
  }

  .card ul {
    padding: 1rem;
    display: flex;
    list-style: none;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .card ul li {
    cursor: pointer;
  }

  .svg {
    transition: all 0.3s;
    /* if you find some problems change w - h : 30px*/
    padding: 1.2rem;
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 100%;
    color: #154979;
    fill: currentColor;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
  }

  .text {
    opacity: 0;
    border-radius: 5px;
    padding: 5px;
    transition: all 0.3s;
    color: #154979;
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    z-index: 9999;
    box-shadow: -5px 0 1px rgba(153, 153, 153, 0.2),
      -10px 0 1px rgba(153, 153, 153, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.082);
  }

  /*isometric prooyection*/
  .iso-pro {
    transition: 0.5s;
  }
  .iso-pro:hover a > .svg {
    transform: translate(15px, -15px);
    border-radius: 100%;
  }

  .iso-pro:hover .text {
    opacity: 1;
    transform: translate(25px, -2px) skew(-5deg);
  }

  .iso-pro:hover .svg {
    transform: translate(5px, -5px);
  }

  .iso-pro span {
    opacity: 0;
    position: absolute;
    color: #0084d1;
    border-color: #1877f2;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3),
      inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
    border-radius: 50%;
    transition: all 0.3s;
    height: 60px;
    width: 60px;
  }

  .iso-pro:hover span {
    opacity: 1;
  }

  .iso-pro:hover span:nth-child(1) {
    opacity: 0.2;
  }

  .iso-pro:hover span:nth-child(2) {
    opacity: 0.4;
    transform: translate(5px, -5px);
  }

  .iso-pro:hover span:nth-child(3) {
    opacity: 0.6;
    transform: translate(10px, -10px);
  }`;



export default Call