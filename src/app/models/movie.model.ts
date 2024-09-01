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
    image: '/assets/movie/01.webp',
    rating: 9.7,
    detail: {
      description:
        'Un cansado glotón se encuentra recuperándose de sus heridas cuando se encuentra con un Deadpool bocazas que ha viajado en el tiempo para curar a su mejor amigo con la esperanza de hacerse amigo de la bestia salvaje y formar equipo para derrotar a un enemigo que ambos tienen en común.',
      cast: [
        { actor: 'Ryan Reynolds', character: 'Deadpool' },
        { actor: 'Hugh Jackman', character: 'Wolverine' },
        { actor: 'Emma Corrin', character: 'Cassandra Nova' },
        { actor: 'Matthew Macfadyen', character: 'Mr. Paradox' },
        { actor: 'Dafne Keen', character: 'Laura/X-23' },
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
        rating: 9.5,
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
    image: '/assets/movie/02.webp',
    rating: 3.8,
    detail: {
      description:
        'Chloe (Carla Juri) viaja a Japón por trabajo, donde es recibida por un viejo amigo, Toshi (Takashi Ueno). Entre la melancolía por la pérdida de su marido y el asombro por el cambio de perspectivas, Chloe deambula por un paisaje desconocido.',
      cast: [
        { actor: 'Carla Juri', character: 'Chloe' },
        { actor: 'Takashi Ueno', character: 'Toshi' },
        { actor: 'Sachiko Ohshima', character: 'Desconocido' },
        { actor: 'Futaba Okazaki', character: 'Desconocido' },
        { actor: 'Gustaf Skarsgård', character: 'Peter' },
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
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5.8,
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
    image: '/assets/movie/03.webp',
    rating: 5.5,
    detail: {
      description:
        'Cuando el multimillonario tecnológico Slater King (Channing Tatum) conoce a la camarera Frida (Naomi Ackie) en su gala benéfica, saltan chispas. La invita a unirse a él y a sus amigos en unas vacaciones de ensueño en su isla privada. Es el paraíso.',
      cast: [
        { actor: 'Naomi Ackie', character: 'Frida' },
        { actor: 'Channing Tatum', character: 'Slater King' },
        { actor: 'Alia Shawkat', character: 'Jess' },
        { actor: 'Cristiano Slater', character: 'Vlc' },
        { actor: 'Simon Rex', character: 'Cody' },
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
    image: '/assets/movie/04.webp',
    rating: 8,
    detail: {
      description:
        'Desde los albores de la civilización, fue adorado como un dios. Apocalipsis, el primer y más poderoso mutante del universo X-Men de Marvel, acumuló los poderes de muchos otros mutantes, volviéndose inmortal e invencible.',
      cast: [
        { actor: 'James McAvoy', character: 'Professor Charles Xavier' },
        { actor: 'Michael Fassbender', character: 'Erik Lehnsherr / Magneto' },
        { actor: 'Jennifer Lawrence', character: 'Raven Darkhölme / Mystique' },
        { actor: 'Nicolás Hoult', character: 'Hank McCoy / Beast' },
        { actor: 'Óscar Isaac', character: 'Apocalypse' },
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
        rating: 7.5,
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
    image: '/assets/movie/05.webp',
    rating: 7.7,
    detail: {
      description:
        'En un futuro cercano, un cansado Logan cuida al enfermo Profesor X en un escondite en la frontera mexicana. Pero los intentos de Logan de esconderse del mundo y de su legado se ven frustrados cuando llega un joven mutante perseguido por fuerzas oscuras.',
      cast: [
        { actor: 'Hugh Jackman', character: 'Logan / Wolverine' },
        { actor: 'Patrick Stewart', character: 'Charles Xavier' },
        { actor: 'Dafne Keen', character: 'Laura / X-23' },
        { actor: 'Boyd Holbrook', character: 'Pierce' },
        { actor: 'Esteban Comerciante', character: 'Caliban' },
        { actor: 'Elizabeth Rodríguez', character: 'Gabriela' },
        { actor: 'Richard E. Grant', character: 'Dr. Rice' },
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
        rating: 7.8,
        comment:
          'Un buen cierre para el personaje de Logan, aunque algunas partes podrían haber sido mejor elaboradas.',
        date: new Date('2019-04-10'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 8.5,
        comment:
          'Profunda y conmovedora, con grandes actuaciones de Hugh Jackman y Patrick Stewart.',
        date: new Date('2019-05-05'),
        userId: '8',
      },
    ],
  },
];
