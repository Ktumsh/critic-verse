import { customAlphabet } from 'nanoid';
import { TvShow } from '../types/tv';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10
);

export const TV_MODEL: TvShow[] = [
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    description:
      'Un profesor de química de secundaria convertido en fabricante de metanfetaminas navega los peligros del comercio de drogas.',
    image: '/assets/tv/01.webp',
    rating: 9,
    detail: {
      genre: ['Crimen', 'Drama', 'Suspenso'],
      cast: [
        {
          actor: 'Bryan Cranston',
          character: 'Walter White',
          image:
            'https://www.metacritic.com/a/img/resize/95c4d7c41d5dcbbf5a957072637480c4a50af37a/catalog/provider/2/9/2-f93822c86cb64a5b776b6cc41b92ade7.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Aaron Paul',
          character: 'Jesse Pinkman',
          image:
            'https://www.metacritic.com/a/img/resize/9724607a4d1f73d5158e802ce45b07f438171cac/catalog/provider/2/9/2-5c460500af1abf4357b784e091bbe73b.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Anna Gunn',
          character: 'Skyler White',
          image:
            'https://www.metacritic.com/a/img/resize/3e5aa9d3d6829e74d5c0971bac1d0de3a625c8d6/catalog/provider/2/9/2-0461cc43aa19670570e7c634d139a48a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Dean Norris',
          character: 'Hank Schrader',
          image:
            'https://www.metacritic.com/a/img/resize/61f9e17c36ede6104ec052695114a4adf484e9d7/catalog/provider/2/9/2-577996223516c62a40afa5ec27a68d4c.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Vince Gilligan'],
      producer: ['Vince Gilligan', 'Mark Johnson', 'Michelle MacLaren'],
      writer: ['Vince Gilligan', 'Peter Gould'],
      seasons: 5,
      episodesPerSeason: [
        { season: 1, episodes: 7 },
        { season: 2, episodes: 13 },
        { season: 3, episodes: 13 },
        { season: 4, episodes: 13 },
        { season: 5, episodes: 16 },
      ],
      episodeDuration: '47 minutos',
      releaseDate: new Date('2008-01-20'),
      streamingPlatform: ['Netflix', 'Amazon Prime'],
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Una conclusión sorprendente la última temporada y casi perfecta para una de las mejores historias jamás contadas en televisión. Impresionante en todos los sentidos.',
        date: new Date('2024-08-12'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'La actuación de Bryan Cranston es fenomenal. La historia te mantiene en el borde de tu asiento.',
        date: new Date('2024-08-14'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Una narrativa sólida, aunque algunos episodios se sienten lentos. Aún así, una serie que vale la pena.',
        date: new Date('2024-08-16'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Brillante desde el comienzo hasta el final. La transformación de Walter White es una obra maestra.',
        date: new Date('2024-08-18'),
        userId: '4',
        report: {
          reason: 'Spoilers sin advertencia.',
          date: new Date('2024-08-19'),
          reportedBy: '5',
        },
      },
    ],
  },
  {
    id: 'sweet-tooth',
    title: 'Sweet Tooth',
    description:
      'Un niño mitad humano, mitad ciervo busca un nuevo comienzo en un mundo post-apocalíptico devastado por un virus mortal.',
    image: '/assets/tv/02.webp',
    rating: 3,
    detail: {
      genre: ['Drama', 'Fantasía', 'Aventura'],
      cast: [
        {
          actor: 'Christian Convery',
          character: 'Gus',
          image: '',
        },
        {
          actor: 'Nonso Anozie',
          character: 'Tommy Jepperd',
          image:
            'https://www.metacritic.com/a/img/resize/a73439250cf4b016d43e5bb4a34331ec9afe98bc/catalog/provider/2/9/2-20a6c25df79190f500610111d2999ef9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Adeel Akhtar',
          character: 'Dr. Singh',
          image:
            'https://www.metacritic.com/a/img/resize/bf8b24e800210df72f58bdabedecabb509254898/catalog/provider/2/14/2-1a050572a51cc7b108d215a94aec27cf.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Stefania LaVie Owen',
          character: 'Bear',
          image:
            'https://www.metacritic.com/a/img/resize/43800af8e03421c292f1d787dfb50bba6f0d7bd1/catalog/provider/2/14/2-01ea0680e75d72e62b8024234ae01a4e.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Jim Mickle'],
      producer: ['Robert Downey Jr.', 'Susan Downey', 'Amanda Burrell'],
      writer: ['Jim Mickle', 'Beth Schwartz'],
      seasons: 2,
      episodesPerSeason: [
        { season: 1, episodes: 8 },
        { season: 2, episodes: 8 },
      ],
      episodeDuration: '45 minutos',
      releaseDate: new Date('2021-06-04'),
      streamingPlatform: ['Netflix'],
      class: '+12',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Sweet Tooth no ha sido necesariamente la historia más tranquila, ya que a la maravillosa primera temporada le siguió una segunda más torpe de lo esperado y muchos de esos problemas siguen presentes en la última temporada.',
        date: new Date('2024-06-06'),
        userId: '2',
        report: {
          reason: 'Comentario confuso e incoherente.',
          date: new Date('2024-06-07'),
          reportedBy: '3',
        },
      },
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Una idea interesante, pero la ejecución es inconsistente. No logró mantener mi interés.',
        date: new Date('2024-06-10'),
        userId: '3',
      },
    ],
  },
  {
    id: 'game-of-thrones',
    title: 'Game of Thrones',
    description:
      'Nueve familias nobles luchan por el control de las tierras de Westeros, mientras un enemigo antiguo regresa.',
    image: '/assets/tv/03.webp',
    rating: 8,
    detail: {
      cast: [
        {
          actor: 'Emilia Clarke',
          character: 'Daenerys Targaryen',
          image:
            'https://www.metacritic.com/a/img/resize/26c088e28ab87a5edf262c84d83c91f91015ee6d/catalog/provider/2/9/2-abd65dc6c917111cfabef3616350e12a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Kit Harington',
          character: 'Jon Snow',
          image:
            'https://www.metacritic.com/a/img/resize/e4a0f0f540db16402b6ca4738b2bab5dbdc7d064/catalog/provider/2/9/2-254636fe50fa428c0de944e97f8cefb0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Lena Headey',
          character: 'Cersei Lannister',
          image:
            'https://www.metacritic.com/a/img/resize/b36c91696ac5ead2bc9be85b950eb56d7d60b525/catalog/provider/2/9/2-b081cf76c45215b6614b9ee53fbed5d0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Peter Dinklage',
          character: 'Tyrion Lannister',
          image:
            'https://www.metacritic.com/a/img/resize/3c5df7599474ac60f8c7f41b371bd3600b3b9146/catalog/provider/2/9/2-26a8d155f1769d63523daa9f4506e17f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['David Benioff', 'D.B. Weiss'],
      producer: ['David Benioff', 'D.B. Weiss', 'Carolyn Strauss'],
      writer: ['David Benioff', 'D.B. Weiss', 'George R.R. Martin'],
      seasons: 8,
      episodesPerSeason: [
        { season: 1, episodes: 10 },
        { season: 2, episodes: 10 },
        { season: 3, episodes: 10 },
        { season: 4, episodes: 10 },
        { season: 5, episodes: 10 },
        { season: 6, episodes: 10 },
        { season: 7, episodes: 7 },
        { season: 8, episodes: 6 },
      ],
      genre: ['Drama', 'Fantasía', 'Aventura'],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2011-04-17'),
      streamingPlatform: ['HBO Max'],
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La dirección artística, las interpretaciones y los increíbles decorados son tan impresionantes como el alcance masivo de la serie. Al principio es un poco lenta, pero te atrapa una vez que te metes en ella.',
        date: new Date('2020-04-13'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La serie es grandiosa hasta la última temporada. Una gran decepción con el final.',
        date: new Date('2021-05-01'),
        userId: '4',
        report: {
          reason: 'Spoilers sobre el final sin advertencia.',
          date: new Date('2021-05-02'),
          reportedBy: '5',
        },
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Una de las mejores series hasta su última temporada, donde se sintió una caída en la narrativa.',
        date: new Date('2022-03-15'),
        userId: '5',
      },
    ],
  },
  {
    id: 'the-boys',
    title: 'The Boys',
    description:
      'Un grupo de vigilantes conocido informalmente como "The Boys" se propone acabar con los superhéroes corruptos que abusan de sus poderes.',
    image: '/assets/tv/04.webp',
    rating: 5,
    detail: {
      genre: ['Acción', 'Drama', 'Ciencia Ficción'],
      cast: [
        {
          actor: 'Karl Urban',
          character: 'Billy Butcher',
          image:
            'https://www.metacritic.com/a/img/resize/e381f34af764e1abf9e68cf9df2916a0596b4008/catalog/provider/2/9/2-aa7272388ea505e3815717f35f53cac3.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jack Quaid',
          character: 'Hughie Campbell',
          image:
            'https://www.metacritic.com/a/img/resize/35d9cf83a707f54be86b7702305e22683f1344c9/catalog/provider/2/9/2-1630e33c2db988f0629a7b870c448caa.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Antony Starr',
          character: 'Homelander',
          image:
            'https://www.metacritic.com/a/img/resize/586c5522da58c503f9f0a5a3492295cac11ad1cd/catalog/provider/2/9/2-223b88573b530cba7ab526e52f3675a2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Erin Moriarty',
          character: 'Starlight',
          image:
            'https://www.metacritic.com/a/img/resize/feb681a41bcdbc9d61e38991b60498e269ea09dc/catalog/provider/2/9/2-acc2ba93f3cb81080dbd9f9b5387d8fc.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Eric Kripke'],
      producer: ['Seth Rogen', 'Evan Goldberg', 'Neal H. Moritz'],
      writer: ['Eric Kripke', 'Evan Goldberg'],
      seasons: 3,
      episodesPerSeason: [
        { season: 1, episodes: 8 },
        { season: 2, episodes: 8 },
        { season: 3, episodes: 8 },
      ],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2019-07-26'),
      streamingPlatform: ['Amazon Prime'],
      class: '+14',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Una verdadera lástima. La primera temporada fue increíble, nueva y fresca. La segunda temporada tuvo momentos muy buenos, muy sangrientos e impactantes, pero también se inclinó por las opiniones políticas de izquierdas como el resto de la basura de Hollywood, y eso ha dañado mucho a la serie. No es tan malo como el final de Juego de Tronos, pero es solo otra serie, nada especial.',
        date: new Date('2020-09-16'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 5,
        comment:
          'Tiene sus momentos brillantes, pero algunas subtramas se sienten forzadas y fuera de lugar.',
        date: new Date('2020-09-20'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Interesante enfoque sobre los superhéroes, pero a veces exagera en su tono.',
        date: new Date('2020-09-25'),
        userId: '6',
        report: {
          reason: 'Comentario ofensivo hacia los creadores.',
          date: new Date('2020-09-26'),
          reportedBy: '7',
        },
      },
    ],
  },
  {
    id: 'the-office',
    title: 'The Office',
    description:
      'Una comedia sobre un grupo de trabajadores de oficina típicos, donde el día de trabajo consiste en choques de ego, comportamientos inapropiados y tedio.',
    image: '/assets/tv/05.webp',
    rating: 9,
    detail: {
      genre: ['Comedia'],
      cast: [
        {
          actor: 'Steve Carell',
          character: 'Michael Scott',
          image:
            'https://www.metacritic.com/a/img/resize/84239affd07003910066ccea5d0893b1f23a3cdf/catalog/provider/2/9/2-a22e528cedd1ac7d0e6cde73d2c75f26.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Rainn Wilson',
          character: 'Dwight Schrute',
          image:
            'https://www.metacritic.com/a/img/resize/e8fbfd2071bdc11a633c9c4445d0d145914103aa/catalog/provider/2/9/2-90a5dc70069665f6ed7890b6b22d8fae.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'John Krasinski',
          character: 'Jim Halpert',
          image:
            'https://www.metacritic.com/a/img/resize/66bcca394bef6077485bb572b7428452d7df5552/catalog/provider/2/14/2-e874b4d2652462f08467e56f5528de4a.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jenna Fischer',
          character: 'Pam Beesly',
          image:
            'https://www.metacritic.com/a/img/resize/fc1e7dbe09dcf193a2330fa4ab849e0f8a478cd2/catalog/provider/2/9/2-c5c597cc8e87d8afa232c7f8a76297ac.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Greg Daniels'],
      producer: ['Greg Daniels', 'Paul Lieberstein', 'Ricky Gervais'],
      writer: ['Greg Daniels', 'Ricky Gervais', 'Stephen Merchant'],
      seasons: 9,
      episodesPerSeason: [
        { season: 1, episodes: 6 },
        { season: 2, episodes: 22 },
        { season: 3, episodes: 23 },
        { season: 4, episodes: 14 },
        { season: 5, episodes: 26 },
        { season: 6, episodes: 26 },
        { season: 7, episodes: 24 },
        { season: 8, episodes: 24 },
        { season: 9, episodes: 25 },
      ],
      episodeDuration: '22 minutos',
      releaseDate: new Date('2005-03-24'),
      streamingPlatform: ['Netflix', 'Peacock'],
      class: '+12',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Todo lo que hizo que la primera temporada fuera tan buena (el guión, la actuación, la incomodidad de todo) no ha disminuido en la segunda temporada. Genial.',
        date: new Date('2021-01-06'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un clásico moderno. Cada episodio tiene algo que te hace reír o reflexionar.',
        date: new Date('2021-02-10'),
        userId: '6',
        report: {
          reason: 'Comentario considerado como spoiler.',
          date: new Date('2021-02-11'),
          reportedBy: '7',
        },
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Algunas temporadas son mejores que otras, pero el conjunto general es fantástico.',
        date: new Date('2021-03-05'),
        userId: '7',
      },
    ],
  },
  {
    id: 'nobody-wants-this',
    title: 'Nobody Wants This',
    description:
      'La relación entre la agnóstica Joanne (Kristen Bell) y el rabino poco convencional Noah (Adam Brody) es el centro de la serie de comedia creada por Erin Foster.',
    image: '/assets/tv/06.webp',
    rating: 7,
    detail: {
      genre: ['Comedia'],
      cast: [
        {
          actor: 'Kristen Bell',
          character: 'Juana',
          image:
            'https://www.metacritic.com/a/img/resize/a525137ae433b0ab1b3f772c295b346aa5298d32/catalog/provider/2/9/2-2d79671741bbbae64a68dd003c04f2a9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Adán Brody',
          character: 'Noé Roklov',
          image:
            'https://www.metacritic.com/a/img/resize/addd5bf33923fa5fea0099c21f01b9c7893566cc/catalog/provider/2/9/2-c2d8c2aa2095f358dbe1e2f217ea63aa.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Justine Lupe',
          character: 'Morgan',
          image:
            'https://www.metacritic.com/a/img/resize/74a1cc296d5ce12ddc6d774b8f2038728ecf309d/catalog/provider/2/14/2-9e530207f470f3b29c1f1a46e0303df5.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Timoteo Simons',
          character: 'Sasha Roklov',
          image:
            'https://www.metacritic.com/a/img/resize/0b975df089c046749354cbc608861d5030c50131/catalog/provider/2/9/2-4750c9a9f0f4a8589c5cf495e805cafb.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jackie Tohn',
          character: 'Esther Roklov',
          image:
            'https://www.metacritic.com/a/img/resize/6cb739fb2b440e5579de16f65aeeafb266499cf7/catalog/provider/2/14/2-9f5afe9ab1916648d7c643f59fa7d8cf.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Kristen Bell'],
      producer: ['Danielle Stokdyk', 'Jack Burditt'],
      writer: ['Jane Becker', 'Ryann Werner'],
      seasons: 3,
      episodesPerSeason: [
        { season: 1, episodes: 12 },
        { season: 2, episodes: 26 },
        { season: 3, episodes: 30 },
      ],
      episodeDuration: '23 minutos',
      releaseDate: new Date('2024-09-22'),
      streamingPlatform: ['Netflix'],
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Todo lo que hizo que la primera temporada fuera tan buena (el guión, la actuación, la incomodidad de todo) no ha disminuido en la segunda temporada. Genial.',
        date: new Date('2021-01-06'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Un clásico moderno. Cada episodio tiene algo que te hace reír o reflexionar.',
        date: new Date('2021-02-10'),
        userId: '6',
        report: {
          reason: 'Comentario considerado como spoiler.',
          date: new Date('2021-02-11'),
          reportedBy: '7',
        },
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Algunas temporadas son mejores que otras, pero el conjunto general es fantástico.',
        date: new Date('2021-03-05'),
        userId: '7',
      },
    ],
  },
  {
    id: 'the-walking-dead-daryl-dixon',
    title: 'The Walking Dead: Daryl Dixon',
    description:
      'Daryl Dixon (Normal Reedus) se encuentra en Francia y trata de descubrir cómo llegó allí y también de encontrar el camino de regreso a casa.',
    image: '/assets/tv/07.webp',
    rating: 6,
    detail: {
      genre: ['Drama', 'Horror'],
      cast: [
        {
          actor: 'Normando Reedus',
          character: 'Daryl Dixon',
          image:
            'https://www.metacritic.com/a/img/resize/722a4ce8284e9d1414dc544113045b2ac6de7c0a/catalog/provider/2/9/2-0d21801aca54283b3d613d8209563cc6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Clémence Poesía',
          character: 'Isabelle Carrière',
          image:
            'https://www.metacritic.com/a/img/resize/1127430c901248273c36b4e550f88b1027234293/catalog/provider/2/9/2-58ecc86feaa2521d8f513bad10b8be18.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Melissa McBride',
          character: 'Carol Peletier',
          image:
            'https://www.metacritic.com/a/img/resize/1d8fc70cbed9eacaa386c393790ca6d5503a212e/catalog/provider/2/9/2-e23cb8edd16def0f409c2b15635fc5f2.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Timoteo Simons',
          character: 'Sasha Roklov',
          image:
            'https://www.metacritic.com/a/img/resize/0b975df089c046749354cbc608861d5030c50131/catalog/provider/2/9/2-4750c9a9f0f4a8589c5cf495e805cafb.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['David Zabel'],
      producer: ['LaToya Morgan', 'Lennie James'],
      writer: ['Robert Kirkman', 'Frank Darabont'],
      seasons: 2,
      episodesPerSeason: [
        { season: 1, episodes: 6 },
        { season: 2, episodes: 6 },
      ],
      episodeDuration: '45 minutos',
      releaseDate: new Date('2024-09-22'),
      streamingPlatform: ['MAX', 'Netflix'],
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Los dos mejores amigos vuelven a sus andadas, intentando derrotar a Marion, salvar a Laurent y volver a Estados Unidos, todo al mismo tiempo. La forma en que llegan allí está llena de las frustraciones habituales de The Walking Dead, pero se trata de...',
        date: new Date('2024-09-23'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'A veces, Carol puede resultar un personaje extraño en la serie, pero aún así está a la altura de ser un programa con Daryl y Carol en el título, y para los fanáticos de The Walking Dead, es probable que eso sea todo lo que necesita ser.',
        date: new Date('2024-09-23'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Los caminos de ella [Carol] y Daryl discurren en paralelo hasta aproximadamente la mitad de la temporada de seis episodios, lo cual resulta muy oportuno en este tipo de historias. Para entonces, el significado de lo que funcionó tan bien en la primera...',
        date: new Date('2024-09-30'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Sin embargo, si eres un fanático de la serie, The Book of Carol puede ofrecerte lo que buscas. Después de todo, el programa está hecho para ti. Si buscas un Walking Dead al estilo clásico, con la camaradería de Carol y Daryl, asesinatos creativos y acción...',
        date: new Date('2024-09-23'),
        userId: '4',
      },
    ],
  },
  {
    id: 'shogun',
    title: 'Shogun',
    description:
      'En el Japón feudal, Lord Yoshii Toranaga (Hiroyuki Sanada), el capitán británico John Blackthorne (Cosmo Jarvis) y la traductora Toda Mariko (Anna Sawai) se reúnen mientras se avecina una guerra civil en esta adaptación de serie limitada de Rachel Kondo y Justin Marks de la novela homónima de James Clavell (que también se convirtió en una miniserie en 1980).',
    image: '/assets/tv/08.webp',
    rating: 9,
    detail: {
      genre: ['Drama', 'Aventura', 'Historia', 'Guerra'],
      cast: [
        {
          actor: 'Cosmo Jarvis',
          character: 'John Blackthorne',
          image:
            'https://www.metacritic.com/a/img/resize/c9f12fca25cd7cb644e5403b6b92b793d637be1b/catalog/provider/2/14/2-3ef52ef136597b3fbf67342b76ea4def.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Anna Sawai',
          character: 'Toda Mariko',
          image: '',
        },
        {
          actor: 'Tadanobu Asano',
          character: 'Kashigi',
          image:
            'https://www.metacritic.com/a/img/resize/b438cbcee363637b3281894a96fc81931165c9ac/catalog/provider/2/9/2-ba6824c59a96fa3e8322f87d4ae5ab4c.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Hiroyuki Sanada',
          character: 'Yoshii Toranaga',
          image:
            'https://www.metacritic.com/a/img/resize/34ddfff7b586f013501bfd9c5abb30a4837d932e/catalog/provider/2/9/2-8c20610d979ed7a2b6b44db12043f3be.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Michaela Clavell'],
      producer: ['Justino Marcos', 'Edward L. McDonnell', 'Eugenio Kelly'],
      writer: ['Edward L. McDonnell'],
      seasons: 1,
      episodesPerSeason: [{ season: 1, episodes: 10 }],
      episodeDuration: '65 minutos',
      releaseDate: new Date('2024-02-27'),
      streamingPlatform: ['Prime videos'],
      class: '+18',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Majestuoso... Nunca quise irme de este mundo. Por favor, FX, nunca dejes de apuntar tan alto. [11 - 31 de marzo de 2024, pág. 4]',
        date: new Date('2024-03-07'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Shōgun es una serie de televisión en su máxima expresión, que utiliza su presupuesto para crear un mundo maravilloso e inmersivo, pero que nunca deja que el espectáculo le quite importancia a su énfasis en los arcos argumentales complejos...',
        date: new Date('2024-02-26'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 9,
        comment:
          'La espera valió la pena por esta producción que se viene gestando desde hace tiempo (anunciada por primera vez en 2018). La nueva Shōgun es una película épica impresionante que nunca permite que los decorados de gran presupuesto eclipsen ...',
        date: new Date('2024-02-27'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'La historia de amor es quizás el aspecto menos convincente de esta iteración de “Shōgun”, pero el resto se siente impresionante en su alcance, atención al detalle y narrativa que atrapa a los espectadores al final del segundo episodio y mantiene su...',
        date: new Date('2024-02-22'),
        userId: '4',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Si vienes aquí esperando ver la Batalla de Sekigahara, te llevarás una decepción. Pero la sutileza y la astucia también pueden ser emocionantes.',
        date: new Date('2024-02-27'),
        userId: '5',
      },
    ],
  },
  {
    id: 'matlock',
    title: 'Matlock',
    description:
      'Madeline "Matty" Matlock (Kathy Bates), de 70 y tantos años, vuelve a trabajar en un estudio jurídico y se junta con la abogada senior Olympia (Skye P. Marshall), quien estaba casada con el hijo (Jason Ritter) del director de la firma (Beau Bridges) en la nueva versión de Matlock creada por Snyder Urman.',
    image: '/assets/tv/09.webp',
    rating: 5,
    detail: {
      genre: ['Drama'],
      cast: [
        {
          actor: 'Kathy Bates',
          character: 'Madeline',
          image:
            'https://www.metacritic.com/a/img/resize/56df945767ddf5cf927a92c5c8ecf3b8894eea61/catalog/provider/2/9/2-3b27405b113284843a572b8ec3a78431.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Skye P. Marshall',
          character: 'Olimpia',
          image: '',
        },
        {
          actor: 'David Del Río',
          character: 'Billy',
          image:
            'https://www.metacritic.com/a/img/resize/18c7a531fa630ac0d73d726626d9a0e71e5d367f/catalog/provider/2/14/2-0dbcbf2bd5af9ace66e487840a8bf26f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Jason Ritter',
          character: 'Juliano',
          image:
            'https://www.metacritic.com/a/img/resize/2eab8addbf7ef9111f2c341da24b573b8501c7e5/catalog/provider/2/9/2-c9d1cdff6e66f1ee03b9f07d5b804721.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Kathy Bates'],
      producer: ['Jennie Snyder Urman', 'Juan voluntad'],
      writer: ['Joanna Klein', 'Eric Christian Olsen'],
      seasons: 1,
      episodesPerSeason: [{ season: 1, episodes: 10 }],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2024-09-22'),
      streamingPlatform: ['Netflix'],
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Tal vez no sea de sorprender que sea durante los momentos más tiernos del programa que Bates y sus compañeros de elenco se unan en un atractivo conjunto que fácilmente podría generar varias temporadas de entretenimiento reconfortante.',
        date: new Date('2024-09-20'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'El reinicio guarda un par de secretos que, si bien hacen que la serie sea extremadamente difícil de reseñar, también le agregan un giro bienvenido a un comienzo que de otro modo no sería prometedor. El programa finalmente se relaja...',
        date: new Date('2024-09-23'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'La serie tiende a ser acogedora y cómica, pero los casos que discuten plantean cuestiones serias y le dan a Bates muchas oportunidades de profundizar dramáticamente mientras convence a testigos renuentes a presentarse o imparte la...',
        date: new Date('2024-09-20'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          '“Mejor de lo que esperaba” no es lo mismo que “suficientemente bueno para el entusiasmo a largo plazo”, pero es un comienzo.',
        date: new Date('2024-09-23'),
        userId: '4',
      },
    ],
  },
  {
    id: 'the-old-man',
    title: ' The Old Man',
    description:
      'El ex oficial de la CIA Dan Chase (Jeff Bridges) ha estado viviendo fuera de la red durante años cuando un asesino intenta matarlo en esta serie basada en la novela homónima de Thomas Perry.',
    image: '/assets/tv/10.webp',
    rating: 6,
    detail: {
      genre: ['Suspenso', 'Drama'],
      cast: [
        {
          actor: 'Puentes de Jeff',
          character: 'Dan Chase',
          image:
            'https://www.metacritic.com/a/img/resize/9a736fb0722e15bc89c72a1c9d586f5f47672938/catalog/provider/2/9/2-8b4fc8e1814053a60b48ada31f4d0e0f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Juan Lithgow',
          character: 'Harold Harper',
          image:
            'https://www.metacritic.com/a/img/resize/12e093fc5d11401a857cae1335af453c7ccb6277/catalog/provider/2/9/2-a89366495d5de575ba6bd32d3a016b2f.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Alia Shawkat',
          character: 'Ángela Adams',
          image:
            'https://www.metacritic.com/a/img/resize/b81e1a08b1847c35e687e995db87633b68b358f0/catalog/provider/2/9/2-de2b4046cc635e44ff294fc44f06ece6.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Navid Negahban',
          character: 'Faraz Hamzad',
          image:
            'https://www.metacritic.com/a/img/resize/0b89dd9865abf625a8b627979e121824fb14c624/catalog/provider/2/9/2-8b7ae7328d7d6368af2bc6c791295957.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Robert Levine'],
      producer: ['Robert Levine'],
      writer: ['Robert Levine', 'Jonathan E. Steinberg'],
      seasons: 2,
      episodesPerSeason: [
        { season: 1, episodes: 7 },
        { season: 2, episodes: 8 },
      ],
      episodeDuration: '45 minutos',
      releaseDate: new Date('2024-09-12'),
      streamingPlatform: ['Netflix'],
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 9,
        comment:
          'Lo que se ofrece en el avance a los críticos de la segunda temporada es excelente, atrapante y lleno de un magnetismo tenso. Francamente, esperamos que este sea el final de la serie, para que termine con un gran, hiriente y poderoso estallido.',
        date: new Date('2024-09-17'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Las sólidas actuaciones de Jeff Bridges y John Lithgow siguen haciendo de The Old Man una película imprescindible, pero definitivamente tiene suficiente confianza en su elenco para brindarnos historias sin ninguno de ellos frente a la cámara.',
        date: new Date('2024-09-12'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Los dos primeros episodios de esta temporada terminan en suspenso que mantienen un suspenso encomiable, a pesar de algunas escenas expositivas que caen en valles proverbiales en comparación con las secuencias de amigos de ruta llenas de acción.',
        date: new Date('2024-09-17'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 6,
        comment:
          'Los primeros dos episodios funcionan bien para mostrar los viajes convergentes que los personajes están realizando en Afganistán, pero los episodios tres y cuatro avanzan demasiado lentamente para desarrollar la intriga de esta temporada.',
        date: new Date('2024-09-09'),
        userId: '4',
      },
    ],
  },
  {
    id: 'la-maquina',
    title: 'La máquina',
    description:
      'El viejo boxeador Esteban "La Máquina" Osuna (Gael García Bernal) aspira a un último título con la ayuda de su mejor amigo y manager Andy Luján (Diego Luna), pero figuras del hampa lo amenazan de muerte en la serie limitada en español.',
    image: '/assets/tv/11.webp',
    rating: 7,
    detail: {
      genre: ['Deporte', 'Drama'],
      cast: [
        {
          actor: 'Gael García',
          character: 'Esteban',
          image:
            'https://www.metacritic.com/a/img/resize/4d2400bb58e3573bf515e3b811cf60a66dcd8f84/catalog/provider/2/9/2-07c8b3edc61a0578645ce89740616ba9.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Diego Luna',
          character: 'Andy',
          image:
            'https://www.metacritic.com/a/img/resize/6c4973b6b4c7f804427d652196a2ba4afd6c9f29/catalog/provider/2/9/2-ae74a09bab68e5f375a30ff2a7b14361.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Eiza González',
          character: 'Irasema',
          image:
            'https://www.metacritic.com/a/img/resize/32d8caae1f2cfe8934159fd102081a146b0f39dc/catalog/provider/2/9/2-bed79baedb19876fd1c7cd41d6aa67fb.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: ['Robert Levine'],
      producer: ['Robert Levine'],
      writer: ['Robert Levine', 'Jonathan E. Steinberg'],
      seasons: 1,
      episodesPerSeason: [{ season: 1, episodes: 7 }],
      episodeDuration: '68 minutos',
      releaseDate: new Date('2024-09-12'),
      streamingPlatform: ['MAX'],
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El drama incluye escenas que giran en torno a las alucinaciones de Esteban, con demasiadas escenas que transcurren dentro de su mente. Pero cuando García Bernal y Luna comparten la pantalla, surge la química entre ellos.',
        date: new Date('2024-10-04'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 8,
        comment:
          'Gracias a la gestión de Ripstein y al encanto de Bernal y Luna, se mueve, se balancea y golpea con precisión.',
        date: new Date('2024-10-04'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Los episodios son intensos, la energía es ilimitada y el resultado es una serie infinitamente entretenida.',
        date: new Date('2024-10-04'),
        userId: '3',
      },
    ],
  },
  {
    id: 'bebe-reno',
    title: 'Bebé reno',
    description:
      'El comediante Donny Dunn (Richard Gadd) no denuncia de inmediato a su acosadora Martha (Jessica Gunning) en la serie de comedia dramática basada en la obra unipersonal de Gadd sobre su propia experiencia con un acosador.',
    image: '/assets/tv/12.webp',
    rating: 8,
    detail: {
      genre: ['Drama'],
      cast: [
        {
          actor: 'Richard Gadd',
          character: 'Donny Dunn',
          image: '',
        },
        {
          actor: 'Jessica Gunning',
          character: 'Martha Scott',
          image: '',
        },
        {
          actor: 'Nava Mau',
          character: 'Teri',
          image: '',
        },
      ],
      director: ['Wim De Greef'],
      producer: ['Petra frita', 'Ed Macdonald'],
      writer: ['Richard Gadd', 'Matt Jarvis'],
      seasons: 1,
      episodesPerSeason: [{ season: 1, episodes: 7 }],
      episodeDuration: '40 minutos',
      releaseDate: new Date('2024-04-11'),
      streamingPlatform: ['Netflix'],
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Esta es una historia sobre enfermedades mentales y dudas paralizantes sobre uno mismo. No es divertida, a menos que te guste reírte de las desgracias de los demás, y crea una atmósfera de incomodidad en cualquier oportunidad. Como ocurre con tantos confesionarios catárticos, no está pensada para que disfrutes viéndola.',
        date: new Date('2024-09-21'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Fue muy desgarrador ver esto. Realmente puso de relieve una vez más que las personas en el poder a veces realmente no pueden ayudarte en momentos de necesidad.',
        date: new Date('2024-09-10'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Este programa es absolutamente maravilloso. Bueno, tiene muchas emociones al mismo tiempo. Los personajes son profundos y está muy bien escrito. No sé cuánto de autobiográfico tiene, pero bueno, tienes que verlo.',
        date: new Date('2024-07-22'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'La mejor serie que he visto últimamente. Me enganchó de principio a fin. El hecho de que esté basada en una historia real... hace que la incredulidad (y la fascinación en cierto modo) aumenten aún más las posibilidades de éxito del protagonista. Además, las interpretaciones son muy convincentes.',
        date: new Date('2024-06-05'),
        userId: '4',
      },
    ],
  },
  {
    id: 'the-morning-show',
    title: 'The Morning Show',
    description:
      'Luchas de poder, rivalidades y escándalos son solo algunos de los desafíos que enfrenta un popular programa de noticias matutino en el drama producido ejecutivamente por Reese Witherspoon y Jennifer Aniston.',
    image: '/assets/tv/13.webp',
    rating: 6,
    detail: {
      genre: ['Drama'],
      cast: [
        {
          actor: 'Jennifer Aniston',
          character: 'Alex Levy',
          image:
            'https://www.metacritic.com/a/img/resize/6aa22b1d2c07feaa9f8661940addbdc509f2b393/catalog/provider/2/9/2-972bae685055969c5afef7dd970abda4.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Reese',
          character: 'Bradley Jackson',
          image:
            'https://www.metacritic.com/a/img/resize/d8e9b592f38fcc04d18e9fd97f30709eacf953ee/catalog/provider/2/9/2-2b41fe195d3010fa53784e3232f42ff4.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Billy Crudup',
          character: 'Cory Ellison',
          image:
            'https://www.metacritic.com/a/img/resize/545e74bffadfc54e4530baefab57be665ccdf4cd/catalog/provider/2/9/2-ede7e27327c6f87b74aec4b2ecc7bde0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Marcos Duplass',
          character: 'Chip negro',
          image:
            'https://www.metacritic.com/a/img/resize/b792c4baeebd7779c79ea97e517db3be28543088/catalog/provider/2/9/2-a6e81058c3438b06020b23a782c53859.jpg?auto=webp&fit=cover&height=300&width=200',
        },
      ],
      director: [' Jay Carson', 'Kerry Ehrin'],
      producer: ['Jay Carsond'],
      writer: ['Jay Carsond'],
      seasons: 3,
      episodesPerSeason: [
        { season: 1, episodes: 10 },
        { season: 2, episodes: 10 },
        { season: 3, episodes: 10 },
      ],
      episodeDuration: '45 minutos',
      releaseDate: new Date('2023-09-13'),
      streamingPlatform: ['Netflix', 'MAX'],
      class: '+13',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 4,
        comment:
          'Esta es una historia sobre enfermedades mentales y dudas paralizantes sobre uno mismo. No es divertida, a menos que te guste reírte de las desgracias de los demás, y crea una atmósfera de incomodidad en cualquier oportunidad. Como ocurre con tantos confesionarios catárticos, no está pensada para que disfrutes viéndola.',
        date: new Date('2024-09-21'),
        userId: '1',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Fue muy desgarrador ver esto. Realmente puso de relieve una vez más que las personas en el poder a veces realmente no pueden ayudarte en momentos de necesidad.',
        date: new Date('2024-09-10'),
        userId: '2',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'Este programa es absolutamente maravilloso. Bueno, tiene muchas emociones al mismo tiempo. Los personajes son profundos y está muy bien escrito. No sé cuánto de autobiográfico tiene, pero bueno, tienes que verlo.',
        date: new Date('2024-07-22'),
        userId: '3',
      },
      {
        id: nanoid(),
        rating: 10,
        comment:
          'La mejor serie que he visto últimamente. Me enganchó de principio a fin. El hecho de que esté basada en una historia real... hace que la incredulidad (y la fascinación en cierto modo) aumenten aún más las posibilidades de éxito del protagonista. Además, las interpretaciones son muy convincentes.',
        date: new Date('2024-06-05'),
        userId: '4',
      },
    ],
  },
  {
    id: 'ncis-origins',
    title: 'NCIS: Origins',
    description:
      'Un joven Leroy Jethro Gibbs (Austin Stowell) comienza su carrera como agente especial en la oficina de Camp Pendleton dirigida por Mike Franks (Kyle Schmid) en el spinoff de NCIS narrado por Mark Harmon.',
    image: '/assets/tv/14.webp',
    rating: 7,
    detail: {
      genre: ['Delito'],
      cast: [
        {
          actor: 'Austin Stowell',
          character: 'Agente especial',
          image:
            'https://www.metacritic.com/a/img/resize/1d8d351b259e3f1f73b5f77840187c95f3cd2fef/catalog/provider/2/9/2-9e4851d67c85396f44610d9630c8c8f7.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Kyle Schmid',
          character: 'Agente especial',
          image:
            'https://www.metacritic.com/a/img/resize/6d297b5aa37634a6ae4dfe5f1ca97f0b014ca42c/catalog/provider/2/14/2-2bc2aea5f392cfd4863a5e7da761dad0.jpg?auto=webp&fit=cover&height=300&width=200',
        },
        {
          actor: 'Mariel Molino',
          character: 'Agente especial',
          image: '',
        },
        {
          actor: 'Diany Rodríguez',
          character: 'Agente especial',
          image: '',
        },
      ],
      director: ['Jonathan Michaels'],
      producer: ['Michael Thomas', 'Rebecca Lawrence'],
      writer: ['Michael Thomas'],
      seasons: 1,
      episodesPerSeason: [{ season: 1, episodes: 13 }],
      episodeDuration: '60 minutos',
      releaseDate: new Date('2024-04-12'),
      streamingPlatform: ['Netflix'],
      class: '+16',
    },
    reviews: [
      {
        id: nanoid(),
        rating: 8,
        comment:
          'El spinoff de NCIS logra capturar la esencia de la serie original mientras explora los primeros días de Gibbs en el Cuerpo de Marines. Austin Stowell interpreta de manera convincente a un joven Leroy Jethro Gibbs, destacando sus luchas iniciales y su evolución hacia el agente que conocemos. La química con Kyle Schmid como Mike Franks añade profundidad a la serie y promete un futuro prometedor. Un gran comienzo que combina elementos de acción y drama con una narrativa sólida.',
        date: new Date('2024-10-04'),
        userId: '5',
      },
      {
        id: nanoid(),
        rating: 7,
        comment:
          'Aunque la trama se centra en los primeros días de Gibbs como agente, este spinoff de NCIS tiene su propio ritmo y estilo. La dirección de Mark Harmon como narrador es un acierto, y la interpretación de Austin Stowell le da vida a un personaje que, aunque es muy querido, necesitaba más exploración en sus orígenes. Aún así, hay espacio para mejorar en el desarrollo de algunos personajes secundarios. Vale la pena seguirla si eres fan de la franquicia.',
        date: new Date('2024-10-04'),
        userId: '6',
      },
    ],
  },
];
