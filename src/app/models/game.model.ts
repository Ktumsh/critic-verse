import { customAlphabet } from 'nanoid';
import { Game } from '../types/game';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const GAME_MODEL: Game[] = [
  {
    id: 'black-myth:-wukong',
    title: 'Black Myth: Wukong',
    image: '/assets/game/01.png',
    description:
      'Black Myth: Wukong es un juego de rol de acción basado en la mitología china. La historia está basada en Viaje al Oeste, una de las cuatro grandes novelas clásicas de la literatura china. Te embarcarás en el papel del Destinado para aventurarte en los desafíos y maravillas que te esperan, para descubrir la verdad oculta tras el velo de una gloriosa leyenda del pasado',
    rating: 9.5,
    detail: {
      summary: 'Black Myth: Wukong',
      genre: ['Acción', 'Aventura'],
      platforms: ['PS5', 'Xbox One', 'PC'],
      releaseDate: new Date('2024-08-19'),
      editor: 'Game Science',
      developer: 'Game Science',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment: 'Muy buen juego, me gustó mucho. Le doy 10 de 10',
        date: new Date('2024-08-23'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Gran jugabilidad y gráficos impresionantes, pero la historia podría ser más profunda.',
        date: new Date('2024-08-30'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment: 'Excelente juego, aunque tiene algunos bugs menores.',
        date: new Date('2024-09-01'),
        userId: '3',
        report: {
          reason: 'Comentario repetitivo y no constructivo.',
          date: new Date('2024-09-02'),
          reportedBy: '4',
        },
      },
    ],
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    image: '/assets/game/02.png',
    description:
      'Las Tierras Intermedias, empañadas por la guerra, sólo pueden sentir la gracia de la Gran Voluntad una vez más cuando un nuevo Señor de los Elden blande el Anillo de los Elden. Levántate, Tarnished, y sigue el camino más allá del mar de niebla para encontrar tu destino en la nueva experiencia similar a Dark Souls de FromSoftware Inc. Escrito por Hidetaka Miyazaki, el creador de Dark Souls, y George R.R. Martin, la mente maestra detrás de Canción de Hielo y Fuego, el juego promete un viaje cautivador pero brutal, en el que la valentía, la determinación y la insaciable sed de triunfo son la clave para acabar recogiendo todos los fragmentos del Elden Ring.',
    rating: 8,
    detail: {
      summary: 'Elden Ring',
      genre: ['Acción', 'RPG'],
      platforms: ['PS4', 'Xbox One', 'PC', 'PS5'],
      releaseDate: new Date('2022-02-25'),
      editor: 'Bandai Namco Games',
      developer: 'From Software',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Los años de espera valieron la pena, Elden Ring es genial. Ofrece una gran cantidad de contenido, un mundo hermoso y una jugabilidad adictiva. Pero la serie comienza a sentirse un poco obsoleta.',
        date: new Date('2023-03-10'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La dificultad es alta, pero eso es parte de su encanto. Sin embargo, no es para todos.',
        date: new Date('2023-04-15'),
        userId: '4',
        report: {
          reason: 'Comentario negativo sin justificación.',
          date: new Date('2023-04-16'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Gran juego, pero a veces se siente repetitivo en comparación con Dark Souls.',
        date: new Date('2023-05-20'),
        userId: '5',
      },
    ],
  },
  {
    id: 'the-legend-of-zelda:-tears-of-the-kingdom',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    image: '/assets/game/03.png',
    description:
      'Te espera una aventura épica por las tierras y los cielos de Hyrule en The Legend of Zelda™: Tears of the Kingdom para Nintendo Switch™. La aventura es tuya para crearla en un mundo alimentado por tu imaginación. En esta secuela de The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las misteriosas islas que flotan en los vastos cielos.',
    rating: 2.5,
    detail: {
      summary: 'The Legend of Zelda: Tears of the Kingdom',
      genre: ['Acción', 'RPG'],
      platforms: ['Nintendo Switch'],
      releaseDate: new Date('2023-05-12'),
      editor: 'Nintendo',
      developer: 'Nintendo',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 2,
        comment:
          'En general, es entretenido, pero eso es todo, es simplemente entretenido. Hay mucho que hacer, pero las cosas que realmente estás haciendo se sienten un poco superficiales. Noto que mi cerebro se desconecta mientras juego, de la misma manera que lo hace cuando veo cosas como TikTok.',
        date: new Date('2024-01-15'),
        userId: '3',
        report: {
          reason: 'Comentario considerado inapropiado.',
          date: new Date('2024-01-16'),
          reportedBy: '6',
        },
      },
      {
        id: nanoid(),
        rating: 3,
        comment:
          'Esperaba más innovación. El juego es bonito, pero carece de profundidad.',
        date: new Date('2024-02-12'),
        userId: '6',
      },
    ],
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    image: '/assets/game/04.png',
    description:
      'Desarrollado por los creadores de Grand Theft Auto V y Red Dead Redemption, Red Dead Redemption 2 es una historia épica sobre la vida en el implacable corazón de Estados Unidos. El vasto y atmosférico mundo del juego también proporciona la base para una nueva experiencia multijugador en línea. Estados Unidos, 1899. Ha comenzado el fin de la era del Salvaje Oeste.',
    rating: 9,
    detail: {
      summary: 'Red Dead Redemption 2',
      genre: ['Acción', 'RPG'],
      platforms: ['Xbox One', 'PC', 'PS5', 'PS4'],
      releaseDate: new Date('2018-10-28'),
      editor: 'Rockstar Games',
      developer: 'Rockstar Games',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Nunca hubo dudas de que Red Dead Redemption 2 iba a ser bueno, pero este es algo especial. Una obra maestra de la que muchos hablarán durante décadas.',
        date: new Date('2020-01-11'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La historia es increíble, pero algunas misiones pueden ser largas y aburridas.',
        date: new Date('2021-02-15'),
        userId: '7',
        report: {
          reason: 'Comentario negativo sin justificación.',
          date: new Date('2021-02-16'),
          reportedBy: '8',
        },
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Mundo abierto detallado y vibrante. Me encantó explorar cada rincón.',
        date: new Date('2022-03-22'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Aunque es un gran juego, los controles pueden ser algo torpes a veces.',
        date: new Date('2023-04-10'),
        userId: '9',
      },
    ],
  },
  {
    id: 'sons-of-the-forest',
    title: 'Sons of the Forest',
    image: '/assets/game/05.png',
    description:
      'Una experiencia completamente nueva de los creadores de "The Forest". Te envían a buscar a un multimillonario desaparecido en una isla remota y te encuentras en un infierno infestado de caníbales. Crea, construye y lucha por sobrevivir, solo o con amigos, en este nuevo y aterrador simulador de terror de supervivencia en mundo abierto. Experimenta la libertad total para enfrentarte al mundo como quieras.',
    rating: 5.8,
    detail: {
      summary: 'Sons of the Forest',
      genre: ['Acción', 'Survival'],
      platforms: ['PC'],
      releaseDate: new Date('2024-02-22'),
      editor: 'Newnight',
      developer: 'Endnight Studios',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Sons of the Forest puede tener algunos problemas con su narrativa, pero sus fundamentos de supervivencia y su sandbox aún merecen una mirada.',
        date: new Date('2024-05-28'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'El juego tiene potencial, pero la falta de contenido y los bugs arruinan la experiencia.',
        date: new Date('2024-06-10'),
        userId: '6',
        report: {
          reason: 'Crítica negativa sin detalles suficientes.',
          date: new Date('2024-06-11'),
          reportedBy: '7',
        },
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Gran atmósfera y jugabilidad, pero necesita más optimización y contenido para mantener a los jugadores interesados.',
        date: new Date('2024-07-01'),
        userId: '7',
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Esperaba más, pero parece más una versión beta que un lanzamiento completo.',
        date: new Date('2024-07-15'),
        userId: '8',
      },
      {
        id: nanoid(),
        rating: 5.5,
        comment:
          'El concepto es bueno, pero la ejecución deja mucho que desear. A la espera de futuras actualizaciones.',
        date: new Date('2024-08-05'),
        userId: '9',
      },
    ],
  },
];
