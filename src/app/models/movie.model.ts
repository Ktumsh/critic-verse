import { customAlphabet } from 'nanoid';
import { Movie } from '../types/movie';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const MOVIE_MODEL: Movie[] = [
  {
    id: 'deadpool-&-wolverine',
    title: 'Deadpool & Wolverine',
    description:
      'Un cansado glotón se encuentra recuperándose de sus heridas cuando se encuentra con un Deadpool bocazas que ha viajado en el tiempo para curar a su mejor amigo con la esperanza de hacerse amigo de la bestia salvaje y formar equipo para derrotar a un enemigo que ambos tienen en común.',
    image: '/assets/movie/01.webp',
    rating: 9,
    detail: {
      cast: [
        {
          actor: 'Ryan Reynolds',
          character: 'Deadpool',
          image:
            'https://www.metacritic.com/a/img/resize/008bc9abb36f96d2d07d1f6a1fccebad09e9db90/catalog/provider/2/9/2-9916bf29a5dec935b32b93d92e40dee2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Hugh Jackman',
          character: 'Wolverine',
          image:
            'https://www.metacritic.com/a/img/resize/5dfd48e5d55ffc9f98835c51a53bf1e264e2c70b/catalog/provider/2/9/2-fe33f7bac54383e9ed757559162f3265.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Emma Corrin',
          character: 'Cassandra Nova',
          image:
            'https://www.metacritic.com/a/img/resize/3e1e73932a366912f816016158448601f22ff7e8/catalog/provider/2/9/2-e5e54561c905148b4caee7949549e80a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Matthew Macfadyen',
          character: 'Mr. Paradox',
          image:
            'https://www.metacritic.com/a/img/resize/e3af78fb601824e235de2dcea9e76ca6833ddb35/catalog/provider/2/9/2-10a042edbe335fd89b456d96fc7b4e90.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dafne Keen',
          character: 'Laura/X-23',
          image:
            'https://www.metacritic.com/a/img/resize/70ec3bb5af94ba6b4cfb8032fd14032d0f634226/catalog/provider/2/13/2-800dbb8c1b612c26ca851ffdd1422e21.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Shawn Levy'],
      producer: [
        'Campana Mitchell',
        'Kevin Feige',
        'Shawn Levy',
        'Josh McLaglen',
        'María McLaglen',
        'Rhett Reese',
        'Ryan Reynolds',
        'Lauren Shuler Donner',
      ],
      writer: [
        'Ryan Reynolds',
        'Rhett Reese',
        'Pablo Wernick',
        'Pozos de Zeb',
        'Shawn Levy',
      ],
      productionCompany: ['Marvel Studios'],
      genre: ['Acción', 'Aventura', 'Comedia', 'Ciencia ficción'],
      releaseDate: new Date('2024-07-26'),
      timeDuration: '2h 8m',
      class: '+17',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Me encantó esta película, la comedia es excelente y para los fanáticos de Deadpool hay muchas referencias cómicas a la altura del personaje.',
        date: new Date('2024-08-22'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          '¡Una combinación épica! Ryan Reynolds y Hugh Jackman tienen una química increíble en pantalla.',
        date: new Date('2024-08-24'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Divertida y llena de acción, aunque algunos chistes podrían no ser para todos.',
        date: new Date('2024-08-26'),
        userId: '3',
        report: {
          reason: 'Comentario ofensivo sobre el humor de la película.',
          date: new Date('2024-08-27'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un crossover que nunca supimos que necesitábamos. Una película entretenida y emocionante.',
        date: new Date('2024-08-28'),
        userId: '4',
      },
    ],
  },
  {
    id: 'i’ll-be-your-mirror',
    title: 'I’ll Be Your Mirror',
    description:
      'Chloe (Carla Juri) viaja a Japón por trabajo, donde es recibida por un viejo amigo, Toshi (Takashi Ueno). Entre la melancolía por la pérdida de su marido y el asombro por el cambio de perspectivas, Chloe deambula por un paisaje desconocido.',
    image: '/assets/movie/02.webp',
    rating: 3,
    detail: {
      cast: [
        {
          actor: 'Carla Juri',
          character: 'Chloe',
          image:
            'https://www.metacritic.com/a/img/resize/d04d0a4060a799addf1b7846cb70f516744c4604/catalog/provider/2/9/2-68baad1148a4ed6f6006a2fca0f1a76c.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Takashi Ueno',
          character: 'Toshi',
          image: '',
        },
        {
          actor: 'Sachiko Ohshima',
          character: 'Grandmother',
          image: '',
        },
        {
          actor: 'Futaba Okazaki',
          character: 'Futaba',
          image: '',
        },
        {
          actor: 'Gustaf Skarsgård',
          character: 'Peter',
          image:
            'https://www.metacritic.com/a/img/resize/6469b43ce11630f1b48389b49050f2b537cca552/catalog/provider/2/9/2-5e9895a11173f4ffacc035a811855b66.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Bradley Rust Gray'],
      producer: [
        'Bradley Rust Gray',
        'So Yong Kim',
        'Jonathon Komack Martin',
        'Alex Orlovsky',
        'Elika Portnoy',
        'David Urrutia',
        'Kiyoshi Inoue',
      ],
      writer: ['Bradley Rust Gray'],
      productionCompany: ['Mutressa Movies'],
      genre: ['Drama'],
      releaseDate: new Date('2024-08-23'),
      timeDuration: '1h 51m',
      class: '+15',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5,
        comment:
          'En el fondo, la actuación de Juri es una maravilla de emoción contenida y asombro ante el mundo que la rodea. Es solo que la película que la rodea le hace un flaco favor a esa actuación.',
        date: new Date('2024-08-25'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'La trama es un poco lenta y confusa, no es para todos los gustos.',
        date: new Date('2024-08-27'),
        userId: '3',
        report: {
          reason: 'Comentario negativo excesivo, no constructivo.',
          date: new Date('2024-08-28'),
          reportedBy: '6',
        },
      },
    ],
  },
  {
    id: 'blink-twice',
    title: 'Blink Twice',
    description:
      'Cuando el multimillonario tecnológico Slater King (Channing Tatum) conoce a la camarera Frida (Naomi Ackie) en su gala benéfica, saltan chispas. La invita a unirse a él y a sus amigos en unas vacaciones de ensueño en su isla privada. Es el paraíso.',
    image: '/assets/movie/03.webp',
    rating: 5,
    detail: {
      cast: [
        {
          actor: 'Naomi Ackie',
          character: 'Frida',
          image:
            'https://www.metacritic.com/a/img/resize/b7560872ec9771f27e27d3f61f0f4b6ff549b084/catalog/provider/2/14/2-4c20503be627d2b5c63f0d8afb54f595.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Channing Tatum',
          character: 'Slater King',
          image:
            'https://www.metacritic.com/a/img/resize/a2f06c140114421b4aff75b0bddb07c1eb27f741/catalog/provider/2/9/2-55ea54a52acd864f3575302151ff5d8f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Alia Shawkat',
          character: 'Jess',
          image:
            'https://www.metacritic.com/a/img/resize/b81e1a08b1847c35e687e995db87633b68b358f0/catalog/provider/2/9/2-de2b4046cc635e44ff294fc44f06ece6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Cristiano Slater',
          character: 'Vlc',
          image:
            'https://www.metacritic.com/a/img/resize/bcc53564e43dc8e4e18fa537871dce53be7baf75/catalog/provider/2/9/2-bdfdd2d791269c1c3d7fa08479c55c86.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Simon Rex',
          character: 'Cody',
          image: '',
        },
      ],
      director: ['Zoe Kravitz'],
      producer: [
        'Bruce Cohen',
        'Aarón Himelstein',
        'Zoe Kravitz',
        'Garret Levitz',
        'Channing Tatum',
      ],
      writer: ['Zoe Kravitz', 'Y. Feigenbaum'],
      productionCompany: ['Bruce Cohen Productions'],
      genre: ['Misterio', 'Suspenso'],
      releaseDate: new Date('2024-08-23'),
      timeDuration: '1h 42m',
      class: '+14',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Un thriller muy efectivo e incisivo que establece a Zoë Kravitz como una directora talentosa y te muestra un lado de Channing Tatum que nunca has visto antes.',
        date: new Date('2024-08-25'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'La historia es intrigante, pero algunos elementos no se desarrollan bien.',
        date: new Date('2024-08-28'),
        userId: '4',
        report: {
          reason: 'Comentario ambiguo y no claro.',
          date: new Date('2024-08-29'),
          reportedBy: '7',
        },
      },
    ],
  },
  {
    id: 'x-men:-apocalipsis',
    title: 'X-Men: Apocalipsis',
    description:
      'Desde los albores de la civilización, fue adorado como un dios. Apocalipsis, el primer y más poderoso mutante del universo X-Men de Marvel, acumuló los poderes de muchos otros mutantes, volviéndose inmortal e invencible.',
    image: '/assets/movie/04.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: 'James McAvoy',
          character: 'Professor Charles Xavier',
          image:
            'https://www.metacritic.com/a/img/resize/03a2daf9a7b216469d152cf82a78387d5288dd21/catalog/provider/2/9/2-cf40dd56b72c8b05f3f2181724d2bfec.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Michael Fassbender',
          character: 'Erik Lehnsherr / Magneto',
          image:
            'https://www.metacritic.com/a/img/resize/0feed6697cbefef1e6ea54faa99e59a9f5872237/catalog/provider/2/14/2-c077c3d1636c2cad5a27c5d1f30887ee.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jennifer Lawrence',
          character: 'Raven Darkhölme / Mystique',
          image:
            'https://www.metacritic.com/a/img/resize/b693790aab40f86a1bb99acdda0e17f3a87174c4/catalog/provider/2/9/2-37b38c1f1b7359f2ac6d145ac3cb6245.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Nicolás Hoult',
          character: 'Hank McCoy / Beast',
          image:
            'https://www.metacritic.com/a/img/resize/c1f2ff384b8f658927ef1095468978013c099efc/catalog/provider/2/9/2-98596c00f4dfc5bcb56b68bf24dd17d9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Óscar Isaac',
          character: 'Apocalypse',
          image: '',
        },
      ],
      director: ['Bryan Cantante'],
      producer: [
        'Aidoo Rubio',
        'Simón Kinberg',
        'Juan Ottman',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Bryan Cantante',
        'Jason Taylor',
      ],
      writer: [
        'Simón Kinberg',
        'Bryan Cantante',
        'Michael Dougherty',
        'Dan Harris',
        'Jack Kirby',
        'Stan Lee',
      ],
      productionCompany: ['Twentieth Century Fox', 'Marvel Entertainment'],
      genre: ['Acción', 'Ciencia ficción', 'Aventura'],
      releaseDate: new Date('2016-05-27'),
      timeDuration: '2h 24m',
      class: '+12',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Al ver Apocalipsis, no tienes la sensación de que cada personaje esté preparado para su propia secuela. Se complementan entre sí. Se necesitan mutuamente. La naturaleza desbordante del elenco de la película es lo que realmente importa.',
        date: new Date('2016-05-26'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 7,
        comment: 'Un buen equilibrio entre acción y desarrollo de personajes.',
        date: new Date('2016-06-01'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Algunas partes del guion son predecibles, pero los efectos especiales son impresionantes.',
        date: new Date('2016-06-05'),
        userId: '6',
      },
    ],
  },
  {
    id: 'logan',
    title: 'Logan',
    description:
      'En un futuro cercano, un cansado Logan cuida al enfermo Profesor X en un escondite en la frontera mexicana. Pero los intentos de Logan de esconderse del mundo y de su legado se ven frustrados cuando llega un joven mutante perseguido por fuerzas oscuras.',
    image: '/assets/movie/05.webp',
    rating: 7.7,
    detail: {
      cast: [
        {
          actor: 'Hugh Jackman',
          character: 'Logan / Wolverine',
          image:
            'https://www.metacritic.com/a/img/resize/5dfd48e5d55ffc9f98835c51a53bf1e264e2c70b/catalog/provider/2/9/2-fe33f7bac54383e9ed757559162f3265.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Patrick Stewart',
          character: 'Charles Xavier',
          image:
            'https://www.metacritic.com/a/img/resize/798ca393d2347c99d24c77198328c6dd140d43eb/catalog/provider/2/9/2-4ad4b8dfcb2bc33bb4f1d16d193e7610.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dafne Keen',
          character: 'Laura / X-23',
          image:
            'https://www.metacritic.com/a/img/resize/70ec3bb5af94ba6b4cfb8032fd14032d0f634226/catalog/provider/2/13/2-800dbb8c1b612c26ca851ffdd1422e21.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Boyd Holbrook',
          character: 'Pierce',
          image:
            'https://www.metacritic.com/a/img/resize/0e6107491927b82fb94c5b1de2509e8c5005c139/catalog/provider/2/9/2-350732f4bb015b0266917e383c2a0785.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Esteban Comerciante',
          character: 'Caliban',
          image: '',
        },
        {
          actor: 'Elizabeth Rodríguez',
          character: 'Gabriela',
          image: '',
        },
        {
          actor: 'Richard E. Grant',
          character: 'Dr. Rice',
          image: '',
        },
      ],
      director: ['James Mangold'],
      producer: [
        'Simón Kinberg',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Dana Robin',
        'Kurt Williams',
      ],
      writer: ['James Mangold', 'Scott Frank', 'Michael Verde'],
      productionCompany: ['Twentieth Century Fox', 'Marvel Entertainment'],
      genre: ['Acción', 'Ciencia ficción', 'Drama', 'Suspenso'],
      releaseDate: new Date('2017-03-03'),
      timeDuration: '2h 17m',
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Este es un final excelente y apropiado para el mutante más grande de las películas.',
        date: new Date('2019-02-17'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Una película oscura y emocionalmente intensa que muestra una faceta diferente de Wolverine.',
        date: new Date('2019-03-01'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Un buen cierre para el personaje de Logan, aunque algunas partes podrían haber sido mejor elaboradas.',
        date: new Date('2019-04-10'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Profunda y conmovedora, con grandes actuaciones de Hugh Jackman y Patrick Stewart.',
        date: new Date('2019-05-05'),
        userId: '8',
      },
    ],
  },
  {
    id: 'joker-locura-en-dos',
    title: 'Joker: Locura en dos',
    description:
      'Arthur Fleck está internado en Arkham a la espera de ser juzgado por sus crímenes como Joker. Mientras lucha con su doble identidad, Arthur no solo se topa con el amor verdadero, sino que también encuentra la música que siempre ha estado dentro de él.',
    image: '/assets/movie/06.webp',
    rating: 5,
    detail: {
      cast: [
        {
          actor: 'Joaquin Phoenix',
          character: 'Arthur Fleck / Joker',
          image:
            'https://www.metacritic.com/a/img/resize/9b8d5a2932202ce84fbc9d71438adb0ba602963b/catalog/provider/2/9/2-fa945913e99f2a86b1cb8c5800002624.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Lady Gaga',
          character: 'Harleen Quinzel / Harley Quinn',
          image:
            'https://www.metacritic.com/a/img/resize/abaf411a4117a439a1e84764a6f4000e195186bd/catalog/provider/2/9/2-8deb27d3c33086154b9ecd59ceba737b.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Zazie Beetz',
          character: 'Sophie Dumond',
          image:
            'https://www.metacritic.com/a/img/resize/4698e48b4fe47b4bc88180bf70c4953586e9fe3b/catalog/provider/2/9/2-0a77d85befca9ed35db3418de5afee72.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Ken Leung',
          character: 'Personaje Desconocido',
          image:
            'https://www.metacritic.com/a/img/resize/66ce70db3c7fe5c7fe682a898f385b242311b981/catalog/provider/2/9/2-92ec61825da4d79f5f8497ccff12c4f9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Catalina Keener',
          character: 'Personaje Desconocido',
          image:
            'https://www.metacritic.com/a/img/resize/0e9e72a1b927aba5ea0ad5cf935566d6bd49fe0b/catalog/provider/2/9/2-7fbb843b6c4f0ceeb7ae58beebf335a5.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Harry Lawtey',
          character: 'Personaje Desconocido',
          image: '',
        },
      ],
      director: ['Todd Phillips'],
      producer: ['Todd Phillips', 'Bradley Cooper', 'Emma Tillinger Koskoff'],
      writer: ['Todd Phillips', 'Scott Silver'],
      productionCompany: ['Warner Bros. Pictures', 'DC Films'],
      genre: ['Drama', 'Crimen', 'Thriller'],
      releaseDate: new Date('2024-10-04'),
      timeDuration: '2h 12m',
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una secuela fascinante que profundiza aún más en la psique del Joker.',
        date: new Date('2024-10-05'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Lady Gaga aporta una nueva dimensión al personaje de Harley Quinn.',
        date: new Date('2024-10-06'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'La película mantiene el tono oscuro y perturbador de la primera entrega.',
        date: new Date('2024-10-07'),
        userId: '7',
      },
    ],
  },
  {
    id: 'el-robot-salvaje',
    title: 'El robot salvaje',
    description:
      'Un robot, la unidad ROZZUM 7134, “Roz” para abreviar, naufraga en una isla deshabitada y debe aprender a adaptarse al duro entorno, construyendo gradualmente relaciones con los animales de la isla y convirtiéndose en el padre adoptivo de un ganso huérfano.',
    image: '/assets/movie/07.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: "Lupita Nyong'o",
          character: 'Roz, Hurgar',
          image:
            'https://www.metacritic.com/a/img/resize/629802cc3466cba94fedf02023605edc61d8ea96/catalog/provider/2/9/2-e308bb276cb06659d036651bc050a57e.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Pedro Pascal',
          character: 'Soplón',
          image:
            'https://www.metacritic.com/a/img/resize/36350c9d74e1c3fc522b5614c28e3e39c71bbf93/catalog/provider/2/9/2-9377f27d7782963e363078f444e96af3.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Kit Connor',
          character: 'Pico brillante',
          image: '',
        },
        {
          actor: 'Bill Nighy',
          character: 'Cuello largo',
          image:
            'https://www.metacritic.com/a/img/resize/ba7a732df1cbcf0a795ed76d86fb28b2f3dd1109/catalog/provider/2/9/2-fa830ed3cf8cc482ea33d07aebf75df1.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Stephanie Hsu',
          character: 'Vontra',
          image:
            'https://www.metacritic.com/a/img/resize/e307c1670081ef654b1cb6c28c646770ada54e0b/catalog/provider/2/14/2-f053e45638443b93c581bf5a9717fb5d.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Matt Berry',
          character: 'Remador',
          image:
            'https://www.metacritic.com/a/img/resize/0e987884bfdc7d0d0f1686d5973120ad69a3b654/catalog/provider/2/14/2-f246e2f2c7c4531255bd102b47dd3ec4.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Ving Rhames',
          character: 'Rayo',
          image:
            'https://www.metacritic.com/a/img/resize/4fe6342a48df5ea770efea6eb4b43df6d9453b4d/catalog/provider/2/9/2-d3a8100460d88abf9bdb80b67af979fd.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Chris Sanders'],
      producer: ['Chris Sanders, Peter Brown'],
      writer: ['Peter Brown'],
      productionCompany: ['Amblin Entertainment', 'Universal Pictures'],
      genre: ['Aventura', 'Fantasía', 'Animación'],
      releaseDate: new Date('2024-09-27'),
      timeDuration: '1h 41m',
      class: '+12',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una historia conmovedora que explora las relaciones entre humanos y robots.',
        date: new Date('2024-09-28'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 8,
        comment: "Lupita Nyong'o ofrece una interpretación asombrosa como Roz.",
        date: new Date('2024-09-28'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Un viaje lleno de emociones y crecimiento personal para el protagonista.',
        date: new Date('2024-09-28'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Las pinceladas discernibles de la película sirven como recordatorio de las manos literales, el trabajo que se necesita para criar a alguien, moldearlo para convertirlo en un sobreviviente y llevar el amor contigo dondequiera que vayas.',
        date: new Date('2024-09-28'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'En comparación con la animación familiar promedio, esto es mucho mejor.',
        date: new Date('2024-09-29'),
        userId: '8',
      },
    ],
  },
  {
    id: 'alien-romulus',
    title: 'Alien: Romulus',
    description:
      'Mientras hurgan en las profundidades de una estación espacial abandonada, un grupo de jóvenes colonizadores espaciales se encuentran cara a cara con la forma de vida más aterradora del universo.',
    image: '/assets/movie/08.webp',
    rating: 6,
    detail: {
      cast: [
        {
          actor: 'Cailee Spaeny',
          character: 'Lluvia',
          image:
            'https://www.metacritic.com/a/img/resize/0065a90087d6b0ce58b691660c6a1766ed4c4310/catalog/provider/2/9/2-5ca30de873113d5624e479ff2d965ec3.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Isabela Merced',
          character: 'Kay',
          image:
            'https://www.metacritic.com/a/img/resize/3b591f15834d6ca0fb93230dfa75cdaecc6e9271/catalog/provider/2/9/2-b260c70f61ff3277590f0fe80c99bd7d.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Aileen Wu',
          character: 'Navarro',
          image: '',
        },
        {
          actor: 'David Jonsson',
          character: 'Andy',
          image: '',
        },
      ],
      director: ['Fede Álvarez'],
      producer: ['Rodó Sayagues', 'Dan OBannon', 'Ronald Shusett'],
      writer: ['Fede Álvarez'],
      productionCompany: ['Jake Roberts'],
      genre: ['Horror', 'Ciencia Ficción', 'Suspenso'],
      releaseDate: new Date('2024-08-16'),
      timeDuration: '1h 59m',
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La película no logra aterrizar del todo bien, ya que se queda en la puerta de embarque unos 10 minutos más o menos. El nivel de sangre puede no sorprender a los fans de las películas anteriores de Álvarez, pero para el aficionado casual de la franquicia podría parecer bastante pesado.',
        date: new Date('2024-08-14'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El desarrollo del acto final se tambalea hacia un horror enfermizo extremo, exagerado y ligeramente tonto, pero hay suficiente que funciona, especialmente en términos de tensión sostenida y grandes sustos jugosos, para darles a los hambrientos de la franquicia algo de lo que disfrutar.',
        date: new Date('2024-08-14'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'En lugar de continuar con la terrible trilogía de precuelas, esta película vuelve a la masacre de la nave minera Nostromo de la primera película, para ver si se puede sacar más dinero de la franquicia destruida. ¡Este es otro reinicio de la franquicia y parece quedarse sin ideas!',
        date: new Date('2024-09-06'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Si no hubiera tenido a alguien del cuidado y atención de Álvarez al mando, Rómulo ciertamente podría haber sido mucho peor.',
        date: new Date('2024-08-14'),
        userId: '8',
      },
    ],
  },
  {
    id: 'azrael',
    title: 'Azrael',
    description:
      'En un mundo en el que nadie habla, una misteriosa y devota comunidad persigue a una joven llamada Azrael (Samara Weaving) que ha escapado de su prisión. Sus despiadados líderes la han vuelto a capturar y la van a sacrificar para pacificar un mal que reside en las profundidades del desierto circundante, pero Azrael no se detendrá ante nada para asegurar su propia seguridad.',
    image: '/assets/movie/09.webp',
    rating: 5,
    detail: {
      cast: [
        {
          actor: 'Samara Tejido',
          character: 'Azrael',
          image:
            'https://www.metacritic.com/a/img/resize/7da4ae912f68ae26b3e54f8a130c6b88b230f8d6/catalog/provider/2/9/2-aaefb77efddf93115a795cf3ae9e4177.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Nathan Stewart-Jarrett',
          character: 'Kenan',
          image:
            'https://www.metacritic.com/a/img/resize/b408a0a48ac5e56fb1da43267b51a3b39f7f1ccf/catalog/provider/2/9/2-8c400c9f462a8d11cbb1efb8cb750cd8.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Eero Milonoff',
          character: 'Lutero',
          image:
            'https://www.metacritic.com/a/img/resize/2bd613d54c64b190318f25f167ce1c94b14918cd/catalog/provider/2/14/2-bc0cb7d116a9db86b1770174bc947fec.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['E.L. Katz'],
      producer: ['Simon Barrett', 'E.L. Katz'],
      writer: ['Simon Barrett'],
      productionCompany: ['C2 Motion Picture Group'],
      genre: ['Horror', 'Acción'],
      releaseDate: new Date('2024-09-27'),
      timeDuration: '1h 25m',
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El rostro expresivo de Weaving y su energía ilimitada la convierten en una heroína cautivadora, y su voluntad de sobrevivir es imparable.',
        date: new Date('2024-03-15'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Weaving, que se destaca en este tipo de películas de acción y terror centradas en los personajes, juega perfectamente con nuestra empatía, guiándonos sin palabras a través de esta tierra maldita.',
        date: new Date('2024-09-26'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Incluso si la ejecución no siempre está donde debería estar, Katz y el guionista Simon Barrett aún merecen sus flores por concebir una idea tan puramente cinematográfica y luchar por ella con tanta confianza.',
        date: new Date('2024-03-15'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Azrael es a la vez familiar y único, ya que combina las comodidades del género con una idea arriesgada. Por suerte, todo funciona y da sus frutos, ya que se trata de una apuesta relativamente grande que se beneficia del poder estelar de Samara Weaving.',
        date: new Date('2024-03-14'),
        userId: '8',
      },
    ],
  },
  {
    id: 'superman-the-christopher-reeve-story',
    title: 'Super/Man: The Christopher Reeve Story',
    description:
      'La historia de Christopher Reeve es un asombroso ascenso de actor desconocido a estrella de cine icónica, y su interpretación definitiva de Clark Kent/Superman estableció el punto de referencia para los universos cinematográficos de superhéroes que dominan el cine actual. ',
    image: '/assets/movie/10.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: 'Cristóbal Reeve',
          character: 'Ser',
          image:
            'https://www.metacritic.com/a/img/resize/e3a892ac1b52d78f83e00fe90d6d73466dd6174a/catalog/provider/2/14/2-29719153307231c91235a2200b31c72a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Johnny Carson',
          character: 'Autopresent',
          image:
            'https://www.metacritic.com/a/img/resize/a60594da1505439df77f8327a4b43dc19ed73916/catalog/provider/2/14/2-27fef8e106935b1fea5c9c02479222f2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Bill Clinton',
          character: 'Ser',
          image:
            'https://www.metacritic.com/a/img/resize/9cf29b05afced5d0ef6518310b9a63bb3665e19d/catalog/provider/2/9/2-01995f1805988e01182af3e262266e95.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Richard Donner',
          character: 'Ser',
          image:
            'https://www.metacritic.com/a/img/resize/37bad4bf204e625dcd8a73b889d2ed02d5b8eebb/catalog/provider/2/9/2-e4d163fddc1bcb20ee43a0276983bcab.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Glenn Close',
          character: 'Ser',
          image:
            'https://www.metacritic.com/a/img/resize/b6d2232980cbb3488ce0da005594c5444af3c9b6/catalog/provider/2/9/2-074554ddd308c65f9d01843f2ba103e1.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: [' Ian Bonhôte', 'Peter Ettedgui'],
      producer: ['Ian Bonhôte', 'Otto Burnham'],
      writer: ['Peter Ettedgui', 'Ian Bonhôte', 'Otto Burnham'],
      productionCompany: ['DC Studios'],
      genre: ['Documental', 'Biografía'],
      releaseDate: new Date('2024-09-21'),
      timeDuration: '1h 46m',
      class: '+14',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          '“Super/Man” es una película emotiva, resiliente e inspiradora que abre las batallas privadas al público en general.',
        date: new Date('2024-01-26'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Super/Man: The Christopher Reeve Story pinta un rico retrato de Reeve como individuo, celebridad, activista y hombre de familia, reforzado por comentarios de sus hijos y amigos y, además, del propio Reeve.',
        date: new Date('2024-01-21'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'En lugar de tratar la vida de la estrella de manera cronológica, se pasa de una consideración de su carrera a su trabajo de defensa de las personas con lesiones de la columna vertebral tras el devastador accidente de equitación de 1995 que lo dejó paralizado.',
        date: new Date('2024-01-26'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La edición en Super/Man está perfectamente manejada, tomando lo que podría haber sido un documental sencillo y convirtiendo una vida en una colección de lo que nos hace ser quienes somos, tanto lo bueno como lo malo.',
        date: new Date('2024-01-26'),
        userId: '8',
      },
    ],
  },
  {
    id: 'transformers-one',
    title: 'Transformers One',
    description:
      'Transformers One es la historia del origen no contada de Optimus Prime y Megatron, mejor conocidos como enemigos jurados, pero que una vez fueron amigos unidos como hermanos que cambiaron el destino de Cybertron para siempre. ',
    image: '/assets/movie/11.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: 'Chris Hemsworth',
          character: 'Orión Pax',
          image:
            'https://www.metacritic.com/a/img/resize/62af4fc0e7b0e5199c7e03e79e439480abfef84d/catalog/provider/2/9/2-5e3401d820a08c19163d7038008051ce.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Brian Tyree Henry',
          character: 'D-16, Megatrón',
          image:
            'https://www.metacritic.com/a/img/resize/3fdebd07dffe1405dc34fba1e1ad46cdf21f72e4/catalog/provider/2/9/2-d726d900987c99dd1c83adea776fc12b.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Scarlett Johansson',
          character: 'Élita -1',
          image:
            'https://www.metacritic.com/a/img/resize/54adf533e215b521529abe1a81fb4abc7f970371/catalog/provider/2/9/2-773399105f7e23bf283844900cc93bde.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Keegan-Michael Key',
          character: 'B-127',
          image:
            'https://www.metacritic.com/a/img/resize/c12402f6f10b2db90031149c74103abbaba275e4/catalog/provider/2/9/2-bd993afc8a4b6a78302398a53816b302.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Glenn Close',
          character: 'Grito de estrellas',
          image:
            'https://www.metacritic.com/a/img/resize/b348755b015db31fcc246e7f53fb0c7c7635d5cf/catalog/provider/2/9/2-2932a2a2680c5f9b2ba34eb92b81b920.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Josh Cooley'],
      producer: ['Bahía Michael', 'Aarón Dem'],
      writer: ['Eric Pearson', 'Andrew Barrer', 'Gabriel Ferrari'],
      productionCompany: ['Paramount Animation'],
      genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
      releaseDate: new Date('2024-09-20'),
      timeDuration: '1h 44m',
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una creación de mundos, una banda sonora y una dirección artística preciosas. Los arcos de los personajes están muy bien diseñados y planteados con fuerza desde el principio, por lo que no resulta repetitivo a pesar de que se trata de un marco temporal bastante comprimido.',
        date: new Date('2024-09-30'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Ojalá más gente vea esto, también me encantan las chicas robot y el arco de Megatron para volverse malvado es genial.',
        date: new Date('2024-10-03'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Dirigida por Josh Cooley, criado en Livermore y ganador del Oscar por “Toy Story 4”, “Transformers One” es para el niño interior, y sin complejos. Y para los adultos presentes, se puede leer como una historia a favor de los sindicatos, en la que los robots trabajadores se unen.',
        date: new Date('2024-09-12'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Un reino sin límites físicos es verdaderamente el lugar al que pertenecen los Transformers, pero eso no impide que la película ofrezca un patetismo sorprendente mientras está allí.',
        date: new Date('2024-09-15'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Como sugiere su sutilmente seguro título, se presenta como si nadie hubiera hecho antes una película de Transformers. Es muy seria y aporta notas de frescura e inocencia a una precuela que, por todos los motivos, no debería haber tenido ninguna.',
        date: new Date('2024-09-17'),
        userId: '9',
      },
    ],
  },
  {
    id: 'pajaro-blanco',
    title: 'Pájaro blanco',
    description:
      'ulian (Bryce Gheisar) ha luchado por sentirse parte de un grupo desde que lo expulsaron de su antigua escuela por su trato hacia Auggie Pullman. Para transformar su vida, la abuela de Julian (Helen Mirren) finalmente le revela a Julian su propia historia de coraje: durante su juventud en la Francia ocupada por los nazis, un niño la protege de un peligro mortal.',
    image: '/assets/movie/12.webp',
    rating: 4,
    detail: {
      cast: [
        {
          actor: 'Ariella Glaser',
          character: 'Sara Blum',
          image: '',
        },
        {
          actor: 'Orlando Schwerdt',
          character: 'Julien Beaumier',
          image: '',
        },
        {
          actor: 'Gillian Anderson',
          character: 'Vivienne',
          image:
            'https://www.metacritic.com/a/img/resize/2aaad7770175e5b000954802558dd07aedb12167/catalog/provider/2/9/2-65be89f5cf57c8dbc876a77ebbbc12b7.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Helen Mirren',
          character: 'abuela',
          image:
            'https://www.metacritic.com/a/img/resize/5d5f6144944469e0c3b3f5decdf3d08e4574901a/catalog/provider/2/9/2-0c39002980c08c763896ce247e0beba6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Marc Forster'],
      producer: ['Mark Bomback', 'RJ Palacio'],
      writer: ['Mark Bomback', 'RJ Palacio'],
      productionCompany: ['Lionsgate Films'],
      genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
      releaseDate: new Date('2024-09-15'),
      timeDuration: '2h 0m',
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Si has visto "Wonder", añadirá algo de profundidad y contexto a la experiencia visual, pero con la dirección segura de Forster, el excelente guion de Bomback y las sólidas actuaciones de los actores veteranos, así como de las caras más jóvenes, "White Bird" vuela bastante bien por sí sola.',
        date: new Date('2024-09-17'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Es un poco convencional, exactamente lo que se podría esperar de una novela histórica de alto nivel dirigida a jóvenes adultos. Ser una película sincera y de buen corazón que incluso puede hacerte derramar algunas lágrimas no es un delito contra el cine.',
        date: new Date('2024-09-17'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Mirren mantiene unida la película con su narración, pero no puede salvarla de la tendencia de Forster a exagerar las escenas emotivas ni de la intrusiva banda sonora de Thomas Newman.',
        date: new Date('2024-09-17'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'Se podría argumentar que Forster y compañía calibran sus efectos anodinos para crear una narrativa del Holocausto que sea aceptable para los espectadores más jóvenes, pero lo que más resuena es una forma particularmente lacrimógena de cubrirse las espaldas en el mundo del espectáculo.',
        date: new Date('2024-09-17'),
        userId: '8',
      },
    ],
  },
  {
    id: 'apartado',
    title: 'Apartado',
    description:
      'Basado en el libro del corresponsal político y nacional de la NBC, Jacob Soboroff, Errol Morris combina entrevistas explosivas con funcionarios que denuncian irregularidades y viñetas narrativas ingeniosas que trazan la difícil situación de una familia migrante.',
    image: '/assets/movie/13.webp',
    rating: 7,
    detail: {
      cast: [
        {
          actor: 'Allan Bualoy',
          character: 'Ser',
          image: '',
        },
        {
          actor: 'Gabriela Cartol',
          character: 'Ser',
          image: '',
        },
        {
          actor: 'Elaine Duque',
          character: 'Ser',
          image: '',
        },
        {
          actor: 'Lee Gelernt',
          character: 'Ser',
          image: '',
        },
      ],
      director: ['Errol Morris'],
      producer: ['Jacob Soboroff'],
      writer: ['Jacob Soboroff'],
      productionCompany: ['Fourth Floor Productions'],
      genre: ['Documental'],
      releaseDate: new Date('2024-08-11'),
      timeDuration: '1h 33m',
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Ver el urgente recordatorio de Errol Morris sobre un documental —posiblemente la película más enfurecedora realizada hasta ahora por un director que ciertamente supo cómo arrojar luz sobre temas exasperantes durante los últimos 45 años—.',
        date: new Date('2024-09-17'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Es una historia de deshumanización, de niños en jaulas y de una formulación de políticas gubernamentales apresurada y ávida de votos, y es una experiencia desgarradora.',
        date: new Date('2024-09-17'),
        userId: '6',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El material es esclarecedor y la montaña de pruebas que se acumulan exige desmenuzarse. El cineasta maneja su tarea con la precisión fría y dura de un fiscal experto.',
        date: new Date('2024-09-17'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Aunque el intento de Morris de personalizar esta crisis humanitaria eligiendo actores para interpretar a una madre y un hijo cruzando la frontera resulta menos que efectivo, la crítica de Separated a la actitud desdeñosa de Estados Unidos hacia los inmigrantes es clara.',
        date: new Date('2024-09-17'),
        userId: '8',
      },
    ],
  },
  {
    id: 'megalopolis',
    title: 'Megalopolis',
    description:
      'Megalópolis es una fábula épica romana ambientada en una América moderna imaginaria. La ciudad de Nueva Roma debe cambiar, lo que provoca un conflicto entre César Catilina, un artista genial que busca dar el salto a un futuro utópico e idealista, y su oponente, el alcalde Franklyn Cicero, que sigue comprometido con un status quo regresivo, perpetuando la codicia, los intereses especiales y la guerra partidista. Dividida entre ellos está la socialité Julia Cicero, la hija del alcalde, cuyo amor por César ha dividido sus lealtades, obligándola a descubrir lo que realmente cree que merece la humanidad.',
    image: '/assets/movie/14.webp',
    rating: 3,
    detail: {
      cast: [
        {
          actor: 'Conductor Adán',
          character: 'César Catilina',
          image:
            'https://www.metacritic.com/a/img/resize/d15897669d268a5fc8e40221f4a6c50a1a77c1da/catalog/provider/2/9/2-3fbe0b4beb9f8d5983924e9c0a8b4cc6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Giancarlo Esposito',
          character: 'El alcalde',
          image:
            'https://www.metacritic.com/a/img/resize/6052c329118f1f8fabd8ff400ae4a76d301521c2/catalog/provider/2/9/2-bc230db178b3dad8b450e2704a0a5d9f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Nathalie',
          character: 'Julia Cicerón',
          image:
            'https://www.metacritic.com/a/img/resize/43ff2aabc97a1a4ed9ae6e1564d68a272b7a51f3/catalog/provider/2/9/2-07fb0cd07ac4cd96b9b855a74ba7a146.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Plaza Aubrey',
          character: 'Guau Platino',
          image:
            'https://www.metacritic.com/a/img/resize/d7c93a5248ef647c6bc1bd5ed8b5a237f21dae95/catalog/provider/2/9/2-461b03ac713120f63d7cbc0c34ae105f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: [' Francis Ford Coppola'],
      producer: [' Francis Ford Coppola'],
      writer: [' Francis Ford Coppola'],
      productionCompany: ['Zoótropo americano'],
      genre: ['Drama', 'Fantasía', 'Ciencia Ficción'],
      releaseDate: new Date('2024-08-25'),
      timeDuration: '2h 13m',
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 3,
        comment:
          'En esta película de 120 millones de dólares que parece una original de Syfy de 2005, momentos verdaderamente encantadores se pierden en un mar de confusión y actores del más alto calibre se ven encasillados en la edición más hostil imaginable.',
        date: new Date('2024-10-02'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 1,
        comment:
          'En una era en la que la ciencia ficción tiene el potencial de provocar una profunda reflexión, desafiar las normas sociales y ofrecer una forma cautivadora de escapar de la realidad, Megalópolis no hace nada de eso. En cambio, ofrece un catastrófico ejercicio de tedio que fracasa en casi todos los niveles del arte cinematográfico.',
        date: new Date('2024-10-01'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Este es el proyecto de pasión autofinanciado de Francis Ford Coppola y tiene una gran visión. A pesar de todos sus defectos, la película no es tan mala. Hay una trama inútil (en realidad, más bien una fábula) de una lucha política entre un artista visionario y el alcalde codicioso. El diálogo suele ser inútil.',
        date: new Date('2024-10-01'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'Pude seguir los aspectos básicos de la trama, pero sentí que se contaba una historia mucho más profunda que no pude descifrar. Lamentablemente, la película no fue lo suficientemente agradable como para que quisiera verla una segunda vez para intentar descifrarla.',
        date: new Date('2024-10-01'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'La vi anoche, la disfruté en ese momento y ahora no puedo dejar de pensar en ella. Cinematografía increíble, algunos versos hermosos e incluso algunas risas. Gracias, Francis.',
        date: new Date('2024-09-30'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 2,
        comment:
          'Imagínese leer La rebelión de Atlas y El manantial, pero perderse por completo todos los puntos importantes. Esta película es absurda y presuntuosa. El reparto es excelente y los papeles están bien interpretados, pero todo es una completa pérdida de tiempo.',
        date: new Date('2024-09-30'),
        userId: '6',
      },
    ],
  },
];
