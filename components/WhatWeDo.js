import React from 'react';

export default function WhatWeDo() {
  return (
    <section id="section-WhatWeDo">
      <div className="container">
        <p className="title">What we do:</p>
        <div className="description">
          <div className="images">
            <img src="/img/touareg.jpg" alt="Touareg" className="carImg" />
            <img src="/img/salesman.jpg" alt="Salesman" className="carImg" />
          </div>
          <div className='text'>
            <p className='descr'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ante sem, vestibulum eu tellus
              bibendum, fermentum ornare arcu. Cras posuere metus sed ligula suscipit viverra. Quisque
              ullamcorper gravida mollis. Praesent porta a felis pellentesque scelerisque. Phasellus ut rutrum
              nibh. Aliquam erat volutpat. Cras aliquet gravida elit nec ultrices.
              Ut elementum nunc nibh, ac mattis lacus dignissim sit amet. Etiam eleifend fringilla lorem,
              egestas lacinia lacus venenatis a. Fusce eu dapibus leo, a tempor libero. Donec vel suscipit
              felis, eu elementum libero. Mauris risus justo, sollicitudin id elit sed, elementum finibus
              sapien. Cras in ipsum diam. Donec magna eros, pretium sit amet est eget, suscipit fermentum
              diam. Nullam bibendum turpis et est vulputate faucibus.
              Donec massa lacus, aliquam venenatis lectus id, volutpat congue orci. Sed consequat tortor vel
              ipsum convallis laoreet vitae laoreet risus. Donec luctus pulvinar enim. Integer euismod diam
              libero, eu auctor tellus tempor non. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. </p>
          </div>
        </div>
      </div>
    </section>
  );
}