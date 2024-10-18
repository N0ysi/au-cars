import React from 'react';

export default function AboutUs() {
  return (
    <section id="section-AboutUs">
      <div className="container">
        <div className="description">
          <p className="title">About us:</p>
          <div className="images">
            <img src="/img/woman1.jpeg" alt="Woman 1" />
            <img src="/img/woman2.jpeg" alt="Woman 2" />
            <img src="/img/man1.jpg" alt="Man 1" />
            <img src="/img/interview.jpg" alt="Interview" />
          </div>
          <div className='text'>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum erat nulla, ullamcorper nec,
              rutrum non, nonummy ac, erat. Aliquam erat volutpat. Mauris tincidunt sem sed arcu. Maecenas lorem.
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
              voluptates repudiandae sint et molestiae non recusandae. Pellentesque sapien. Phasellus rhoncus.
              Aliquam ante. Nam sed tellus id magna elementum tincidunt. Proin pede metus, vulputate nec,
              fermentum fringilla, vehicula vitae, justo. Sed convallis magna eu sem. Maecenas fermentum, sem in
              pharetra pellentesque, velit turpis volutpat ante, in pharetra metus odio a lectus. Nulla pulvinar
              eleifend sem. Integer imperdiet lectus quis justo. Maecenas lorem. Aliquam ante. Donec ipsum massa,
              ullamcorper in, auctor et, scelerisque sed, est. Pellentesque sapien.
              In dapibus augue non sapien. Sed ac dolor sit amet purus malesuada congue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}