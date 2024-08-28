import { customAlphabet } from 'nanoid';
import { Movie } from '../types/movie';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const MOVIE_MODEL: Movie[] = [
  {
    id: nanoid(),
    title: 'Deadpool & Wolverine',
    image: '/assets/movie/01.webp',
    rating: 9.7,
    details: {
      description:
        'Un cansado glotón se encuentra recuperándose de sus heridas cuando se encuentra con un Deadpool bocazas que ha viajado en el tiempo para curar a su mejor amigo con la esperanza de hacerse amigo de la bestia salvaje y formar equipo para derrotar a un enemigo que ambos tienen en común.',
      cast: [
        'Ryan Reynolds',
        'Hugh Jackman',
        'Emma Corrin',
        'Matthew Macfadyen',
        'Dafne Keen',
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
      written: [
        'Ryan Reynolds',
        'Rhett Reese',
        'Pablo Wernick',
        'Pozos de Zeb',
        'Shawn Levy',
      ],
      productionCompany: 'Marvel Studios',
      genre: ['Acción', 'Aventura', 'Comedia', 'Ciencia ficción'],
      releaseDate: '26 de julio de 2024',
      timeDuration: '02:08',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Me encantó esta película, la comedia es excelente y para los fanáticos de Deadpool hay muchas referencias cómicas a la altura del personaje.',
        date: '22-08-2024',
        userId: '1',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'I’ll Be Your Mirror',
    image: '/assets/movie/02.webp',
    rating: 3.8,
    details: {
      description:
        'Chloe (Carla Juri) viaja a Japón por trabajo, donde es recibida por un viejo amigo, Toshi (Takashi Ueno). Entre la melancolía por la pérdida de su marido y el asombro por el cambio de perspectivas, Chloe deambula por un paisaje desconocido.',
      cast: [
        'Carla Juri',
        'Takashi Ueno',
        'Sachiko Ohshima',
        'Futaba Okazaki',
        'Gustaf Skarsgård',
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
      written: ['Bradley Rust Gray'],
      productionCompany: 'Mutressa Movies',
      genre: ['Drama'],
      releaseDate: '23 de agosto de 2024',
      timeDuration: '01:51',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5.8,
        comment:
          'En el fondo, la actuación de Juri es una maravilla de emoción contenida y asombro ante el mundo que la rodea. Es solo que la película que la rodea le hace un flaco favor a esa actuación.',
        date: '25-08-2024',
        userId: '2',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Blink Twice',
    image: '/assets/movie/03.webp',
    rating: 5.5,
    details: {
      description:
        'Cuando el multimillonario tecnológico Slater King (Channing Tatum) conoce a la camarera Frida (Naomi Ackie) en su gala benéfica, saltan chispas. La invita a unirse a él y a sus amigos en unas vacaciones de ensueño en su isla privada. Es el paraíso.',
      cast: [
        'Naomi Ackie',
        'Channing Tatum',
        'Alia Shawkat',
        'Cristiano Slater',
        'Simón Rex',
      ],
      director: ['Zoe Kravitz'],
      producer: [
        'Bruce Cohen',
        'Aarón Himelstein',
        'Zoe Kravitz',
        'Garret Levitz',
        'Channing Tatum',
      ],
      written: ['Zoe Kravitz', 'Y. Feigenbaum'],
      productionCompany: 'Bruce Cohen Productions',
      genre: ['Misterio', 'Suspenso'],
      releaseDate: '23 de agosto de 2024',
      timeDuration: '01:42',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Un thriller muy efectivo e incisivo que establece a Zoë Kravitz como una directora talentosa y te muestra un lado de Channing Tatum que nunca has visto antes.',
        date: '25-08-2024',
        userId: '3',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'X-Men: Apocalipsis',
    image: '/assets/movie/04.webp',
    rating: 8,
    details: {
      description:
        'Desde los albores de la civilización, fue adorado como un dios. Apocalipsis, el primer y más poderoso mutante del universo X-Men de Marvel, acumuló los poderes de muchos otros mutantes, volviéndose inmortal e invencible.',
      cast: [
        'James McAvoy',
        'Michael Fassbender',
        'Jennifer Lawrence',
        'Nicolás Hoult',
        'Óscar Isaac',
      ],
      director: ['Bryan cantante'],
      producer: [
        'Aidoo Rubio',
        'Simón Kinberg',
        'Juan Ottman',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Bryan Cantante',
        'Jason Taylor',
      ],
      written: [
        'Simón Kinberg',
        'Bryan Cantante',
        'Michael Dougherty',
        'Dan Harris',
        'Jack Kirby',
        'Stan Lee',
      ],
      productionCompany: 'Twentieth Century Fox, Marvel Entertainment,',
      genre: ['Acción', 'Ciencia ficción', 'Aventura'],
      releaseDate: '27 de mayo de 2016',
      timeDuration: '02:24',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Al ver Apocalipsis, no tienes la sensación de que cada personaje esté preparado para su propia secuela. Se complementan entre sí. Se necesitan mutuamente. La naturaleza desbordante del elenco de la película es lo que realmente importa.',
        date: '26-05-2016',
        userId: '4',
      },
    ],
  },
  {
    id: nanoid(),
    title: 'Logan',
    image: '/assets/movie/05.webp',
    rating: 7.7,
    details: {
      description:
        'En un futuro cercano, un cansado Logan cuida al enfermo Profesor X en un escondite en la frontera mexicana. Pero los intentos de Logan de esconderse del mundo y de su legado se ven frustrados cuando llega un joven mutante perseguido por fuerzas oscuras.',
      cast: [
        'Hugh Jackman',
        'Patrick Stewart',
        'Dafne Keen',
        'Boyd Holbrook',
        'Esteban Comerciante',
        'Elizabeth Rodríguez',
        'Richard E. Grant',
      ],
      director: ['James Mangold'],
      producer: [
        'Simón Kinberg',
        'Hutch Parker',
        'Lauren Shuler Donner',
        'Dana Robin',
        'Kurt Williams',
      ],
      written: ['James Mangold', 'Scott Frank', 'Michael Verde'],
      productionCompany: 'Twentieth Century Fox, Marvel Entertainment,',
      genre: ['Acción', 'Ciencia ficción', 'Drama', 'Suspenso'],
      releaseDate: '03 de marzo de 2017',
      timeDuration: '02:17',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Este es un final excelente y apropiado para el mutante más grande de las películas.',
        date: '17-02-2019',
        userId: '5',
      },
    ],
  },
];
