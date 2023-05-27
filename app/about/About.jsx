import Image from 'next/image';

export function About(){

  return (
    <div className='mt-24 p-8 text-center bg-white'>
      <p className='font-semibold text-black uppercase'>About Me</p>

      <div className='flex justify-between row-auto'>
        <Image src="/perfil.jpg" alt="Author" width={200} height={200} />
        <div className='p-4 text-justify '>
          Hola! Mi nombre es <b>Lucia Rdawanski</b>, soy Diseñadora Gráfica, Community Manager y Full Stack Developer. Este es mi{" "}
          <a href="https://github.com/luciaradwanski">GitHub</a>, por este medio tengo expuestos mis trabajos, si quieren pueden verlos. Desarrolle aplicaciones web aplicando conocimientos de{" "}
          <b>Node.js, Sequelize, Express, PostgreSQL, React, Redux, Redux-Toolkit, Html, CSS, Javascript, Angular, Next.js, Vite, MongoDB, Python.</b>{" "}
        </div>
        <div className='p-4 text-justify'>
          Cree y diseñe distintas piezas gráficas de diseño desde Logotipos, Branding de Empresa, Fachada de negocio, Cartelería, flayer, Videos publicitarios, Packaging, Animación, Catálogos de productos, Manual de uso, etc.
          Desarrolle estas piezas gracias al buen manejo de las aplicaciones de Adobe como: Illustrator, Photoshop, InDesign, Premier Pro, After Effects, y otras que no son de Adobe como Moho, Movavi, Genially.
        </div>
      </div>
      <div>
        Muchas gracias por pasar por aquí, si querés dejarme algún feedback para
        mejorar podés escribirme a mi{" "}
        <a href="https://www.linkedin.com/in/lradw/" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
};