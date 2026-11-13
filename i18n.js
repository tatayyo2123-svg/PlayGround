// GODSPIRE — localization and UI language helpers

export let lang = 'en';

export function setLang(next) {
  lang = next === 'es' ? 'es' : 'en';
  return lang;
}
export function isEs() { return lang === 'es'; }

const ES = {
  'Activities & battles': 'Actividades y batallas',
  'Train, explore and face legendary foes': 'Entrena, explora y afronta enemigos legendarios',
  /* ── title & chrome ── */
  'A life simulator of the divine': 'Un simulador de vida de lo divino',
  'Every mortal is a prayer. Every prayer is a step.<br /><em>Climb until the stars kneel.</em>':
    'Cada mortal es una plegaria. Cada plegaria es un paso.<br /><em>Asciende hasta que las estrellas se arrodillen.</em>',
  'Begin Your Myth': 'Comienza tu mito',
  'Continue Chronicle': 'Continuar crónica',
  'How to Play': 'Cómo jugar',
  'domains': 'dominios',
  'mortal races': 'razas mortales',
  'divine ranks': 'rangos divinos',
  'thrones': 'tronos',
  'Shape a face. Found a people. Take a throne.': 'Crea un rostro. Funda un pueblo. Toma un trono.',
  'Progress saves in your browser': 'El progreso se guarda en tu navegador',
  'Return to the Void': 'Volver al Vacío',
  'I. Shape Your Divinity': 'I. Forja tu divinidad',
  'The divine workshop': 'El taller divino',
  'Create Your God': 'Crea a tu dios',
  'Choose a domain, a lineage, and the face the world will carve into its temples.':
    'Elige un dominio, un linaje y el rostro que el mundo tallará en sus templos.',
  'Divine Name': 'Nombre divino',
  'Epithet': 'Epíteto',
  'Pantheon': 'Panteón',
  'Every detail is carved by you.': 'Cada detalle lo tallas tú.',
  'Randomize visage': 'Aleatorizar rostro',
  'Face': 'Rostro',
  'Body': 'Cuerpo',
  'Eyes': 'Ojos',
  'Hair': 'Cabello',
  'Divine': 'Divino',
  'Enter the Mortal Realm': 'Entra al reino mortal',
  'Sound on': 'Sonido activado',
  'Sound off': 'Sonido desactivado',
  'Chronicle resumed': 'Crónica reanudada',
  'No chronicle found': 'No se encontró ninguna crónica',
  'Chronicle saved': 'Crónica guardada',
  'Close': 'Cerrar',
  'Done': 'Hecho',
  'More': 'Más',
  'Language': 'Idioma',
  'Toggle sound': 'Alternar sonido',
  'Menu': 'Menú',
  'Game sections': 'Secciones del juego',
  'English': 'Inglés',
  'Spanish': 'Español',
  'Switch language': 'Cambiar idioma',
  'Language: English': 'Idioma: Español',
  'Language: Spanish': 'Idioma: Inglés',
  'A full Spanish chronicle': 'Una crónica completamente en español',
  'Play in English': 'Jugar en inglés',

  /* ── creator panels ── */
  'Skin': 'Piel',
  'The hue of a body carved from starlight and clay.': 'El tono de un cuerpo tallado con luz de estrellas y barro.',
  'Bone structure is a kind of mythology.': 'La estructura ósea es una forma de mitología.',
  'Complexion': 'Tez',
  'What mortals see when they dare to look closely.': 'Lo que los mortales ven cuando se atreven a mirar de cerca.',
  'Sacred Markings': 'Marcas sagradas',
  'Your sigil written on the flesh.': 'Tu sigilo escrito en la carne.',
  'Adornment': 'Adorno',
  'A crown is a promise the heavens must keep.': 'Una corona es una promesa que los cielos deben cumplir.',
  'Build': 'Constitución',
  'The silhouette that will fill a thousand statues.': 'La silueta que llenará mil estatuas.',
  'Greek Attire': 'Vestimenta griega',
  'Choose the drape or armor your statues will wear.': 'Elige los pliegues o la armadura que vestirán tus estatuas.',
  'Presence': 'Presencia',
  'The air around you is part of the body.': 'El aire que te rodea es parte del cuerpo.',
  'Divine radiance': 'Resplandor divino',
  'A soft glow gathers at your edges.': 'Un brillo suave se acumula en tus bordes.',
  'Your build shapes the shoulders and chest of every idol carved in your name.':
    'Tu constitución define los hombros y el pecho de cada ídolo tallado en tu nombre.',
  'Shape': 'Forma',
  'How you look upon the world.': 'Cómo miras al mundo.',
  'Iris': 'Iris',
  'The colour mortals will write prophecies about.': 'El color sobre el que los mortales escribirán profecías.',
  'Divine Light': 'Luz divina',
  'When you are angry, the air remembers.': 'Cuando te enfadas, el aire lo recuerda.',
  'Eyes of power': 'Ojos de poder',
  'A faint luminescence spills from your irises.': 'Una luminescencia tenue emana de tus iris.',
  'Toggle eye glow': 'Alternar brillo ocular',
  'Style': 'Estilo',
  'A crown of hair, or a crown over none.': 'Una corona de cabello, o una corona sobre nada.',
  'Colour': 'Color',
  'Raven, wheat, starlight, or something stranger.': 'Cuervo, trigo, luz de estrellas o algo más extraño.',
  'Hair grows differently for the divine. It may move in a wind that only you feel.':
    'El cabello crece de forma distinta para los divinos. Puede moverse con un viento que solo tú sientes.',
  'Domain': 'Dominio',
  'What you are the god of. This shapes your powers and your passives.':
    'Aquello de lo que eres dios. Esto define tus poderes y tus pasivas.',
  'Divine Lineage': 'Linaje divino',
  'The kind of god you were born to be.': 'El tipo de dios para el que naciste.',
  'Your First People': 'Tu primer pueblo',
  'The race that will speak your name first.': 'La raza que pronunciará tu nombre primero.',

  /* ── appearance options ── */
  'Oval': 'Ovalado',
  'Angular': 'Angular',
  'Round': 'Redondo',
  'Heart': 'Corazón',
  'Long': 'Alargado',
  'Heroic': 'Heroico',
  'Bearded': 'Barbado',
  'Greek Chiton': 'Quitón griego',
  'Draped Himation': 'Himatión drapeado',
  'Bronze Cuirass': 'Coraza de bronce',
  'Megaran Sweep': 'Peinado megarense',
  'Slender': 'Esbelto',
  'Athletic': 'Atlético',
  'Broad': 'Ancho',
  'Colossal': 'Colosal',
  'Willow-thin, made of light and debt.': 'Delgado como un sauce, hecho de luz y deuda.',
  'A body built for walking between worlds.': 'Un cuerpo hecho para caminar entre mundos.',
  'Shoulders like temple gates.': 'Hombros como puertas de templo.',
  'The room bends around you.': 'La habitación se curva a tu alrededor.',
  'Almond': 'Almendrado',
  'Sharp': 'Afilado',
  'Gentle': 'Suave',
  'Flowing': 'Ondulado',
  'Cropped': 'Corto',
  'Braided': 'Trenzado',
  'Topknot': 'Moño alto',
  'Wild': 'Salvaje',
  'Mohawk': 'Mohicano',
  'Bald': 'Calvo',
  'Ponytail': 'Coleta',
  'Curls': 'Rizos',
  'Locs': 'Rastas',
  'Bun': 'Moño bajo',
  'Undercut': 'Rapado lateral',
  'None': 'Ninguna',
  'Rune': 'Runa',
  'War Paint': 'Pintura de guerra',
  'Constellation': 'Constelación',
  'Tears of Light': 'Lágrimas de luz',
  'Laurel': 'Laurel',
  'Circlet': 'Diadema',
  'Horns': 'Cuernos',
  'Halo': 'Halo',
  'Natural': 'Natural',
  'Radiant': 'Radiante',
  'Ashen': 'Ceniciento',
  'Starlit': 'Estrellado',
  'Porcelain': 'Porcelana',
  'Warm Ivory': 'Marfil cálido',
  'Amber': 'Ámbar',
  'Umber': 'Sombra',
  'Deep Bronze': 'Bronce profundo',
  'Obsidian': 'Obsidiana',
  'Jade': 'Jade',
  'Rose': 'Rosa',
  'Walnut': 'Nogal',
  'Chestnut': 'Castaño',
  'Ember': 'Brasa',
  'Wheat': 'Trigo',
  'Silver': 'Plata',
  'Snow': 'Nieve',
  'Violet': 'Violeta',
  'Tide': 'Marea',
  'Blood': 'Sangre',
  'Azure': 'Azul',
  'Verdant': 'Verde',
  'Crimson': 'Carmesí',
  'Gold': 'Oro',

  /* ── domains ── */
  'Storm': 'Tormenta',
  'Death': 'Muerte',
  'Love': 'Amor',
  'War': 'Guerra',
  'Wisdom': 'Sabiduría',
  'Nature': 'Naturaleza',
  'Sun': 'Sol',
  'Moon': 'Luna',
  'Trickery': 'Engaño',
  'Forge': 'Forja',
  'Sea': 'Mar',
  'Time': 'Tiempo',
  'Miracles convert 25% more souls.': 'Los milagros convierten un 25 % más de almas.',
  'Smiting grants +3 extra power.': 'Castigar otorga +3 de poder adicional.',
  '+2 faith every aeon.': '+2 de fe cada eón.',
  '+2 power every aeon.': '+2 de poder cada eón.',
  '+2 wisdom every aeon.': '+2 de sabiduría cada eón.',
  'Your worshippers multiply 10% faster.': 'Tus fieles se multiplican un 10 % más rápido.',
  '+1 faith and +1 influence every aeon.': '+1 de fe y +1 de influencia cada eón.',
  '+1 wisdom and 5% faster growth.': '+1 de sabiduría y 5 % más de crecimiento.',
  '+2 influence every aeon.': '+2 de influencia cada eón.',
  'Relics are 35% stronger and cost less faith.': 'Las reliquias son un 35 % más fuertes y cuestan menos fe.',
  '6% faster growth and +1 influence every aeon.': '6 % más de crecimiento y +1 de influencia cada eón.',
  'Gain +1 action every third aeon. +1 wisdom per aeon.': 'Ganas +1 acción cada tercer eón. +1 de sabiduría por eón.',

  /* ── lineages ── */
  'Titan': 'Titán',
  'Celestial': 'Celestial',
  'Chthonic': 'Ctónico',
  'Elemental': 'Elemental',
  'Ascended Mortal': 'Mortal Ascendido',
  'Elder-blooded and vast. Might gathers in your shadow.': 'De sangre antigua e inmenso. El poder se reúne en tu sombra.',
  'Born between the stars. Prayer reaches you without effort.': 'Nacido entre las estrellas. La plegaria te alcanza sin esfuerzo.',
  'Crowned beneath the earth. The dead whisper your titles.': 'Coronado bajo la tierra. Los muertos susurran tus títulos.',
  'A living force of the world. Life clings to your passing.': 'Una fuerza viva del mundo. La vida se aferra a tu paso.',
  'You were mortal once. You have not forgotten how they think.': 'Fuiste mortal una vez. No has olvidado cómo piensan.',

  /* ── traits ── */
  'Industrious': 'Laborioso',
  'Arcane': 'Arcano',
  'Zealous': 'Ferviente',
  'Feral': 'Salvaje',
  'Tidal': 'Mareal',
  'Stoic': 'Estoico',
  'Cosmic': 'Cósmico',
  'Apex': 'Cumbre',
  '+12% follower growth.': '+12 % de crecimiento de fieles.',
  '+3 faith every aeon.': '+3 de fe cada eón.',
  '+1 influence and 6% faster growth.': '+1 de influencia y 6 % más de crecimiento.',
  '+1 power and +1 wisdom every aeon.': '+1 de poder y +1 de sabiduría cada eón.',
  '+1 faith and +1 wisdom every aeon.': '+1 de fe y +1 de sabiduría cada eón.',
  '+3 power every aeon.': '+3 de poder cada eón.',

  /* ── starter races ── */
  'Humans': 'Humanos',
  'High Elves': 'Altos Elfos',
  'Stone Dwarves': 'Enanos de Piedra',
  'Beastkin': 'Pielesbestia',
  'Tideborn': 'Nacidomareas',
  'Emberkin': 'Brasantes',
  'Starfolk': 'Estelares',
  'Draconians': 'Dracónicos',
  'Short-lived, hungry, and endlessly inventive.': 'De vida breve, hambrientos e infinitamente inventivos.',
  'Long of memory, longer of grudge, beautiful in grief.': 'De larga memoria, rencor más largo, hermosos en el duelo.',
  'They carve your face into mountains and call it modest.': 'Tallan tu rostro en las montañas y lo llaman modesto.',
  'Claws, tusks, bright eyes. They worship with their whole bodies.': 'Garras, colmillos, ojos brillantes. Adoran con todo el cuerpo.',
  'They build shrines of coral and sing in drowned chords.': 'Construyen santuarios de coral y cantan en acordes ahogados.',
  'Born in ash, devoted in fire, brief and blinding.': 'Nacidos de la ceniza, devotos del fuego, breves y cegadores.',
  'They read your will in comets and argue about the commas.': 'Leen tu voluntad en los cometas y discuten sobre las comas.',
  'Scaled empires that remember every oath you ever broke.': 'Imperios escamosos que recuerdan cada juramento que rompiste.',

  /* ── ranks ── */
  'Demigod': 'Semidiós',
  'Divine Spark': 'Chispa Divina',
  'Minor Deity': 'Deidad Menor',
  'Patron God': 'Dios Patrón',
  'Greater God': 'Dios Mayor',
  'High God': 'Dios Elevado',
  'Elder God': 'Dios Anciano',
  'Primordial': 'Primordial',
  'Supreme Architect': 'Arquitecto Supremo',
  'A spark of the divine, barely kindled. The world does not yet know your name.':
    'Una chispa de lo divino, apenas encendida. El mundo aún no conoce tu nombre.',
  'The first temple rises. Somewhere, a child draws your sigil in the dust.':
    'Se alza el primer templo. En algún lugar, un niño dibuja tu sigilo en el polvo.',
  'A city takes your name. Priests argue over the meaning of your silence.':
    'Una ciudad adopta tu nombre. Los sacerdotes discuten el significado de tu silencio.',
  'A nation calls you theirs. Your banners fly over fields you have never walked.':
    'Una nación te llama suyo. Tus estandartes ondean sobre campos que nunca has pisado.',
  'Your myths are sung in three languages. Rival gods send envoys, not armies.':
    'Tus mitos se cantan en tres idiomas. Los dioses rivales envían emisarios, no ejércitos.',
  'The old powers take notice. The heavens rearrange themselves around your throne.':
    'Los poderes antiguos se dan cuenta. Los cielos se reorganizan alrededor de tu trono.',
  'You remember the first dawn. Mortals now measure time by your festivals.':
    'Recuerdas el primer amanecer. Los mortales ahora miden el tiempo por tus festivales.',
  'You are older than worship. The stars lean in to hear what you will do next.':
    'Eres más antiguo que la adoración. Las estrellas se inclinan para oír lo que harás después.',
  'The Twenty Thrones bow. You are the hand that turns the wheel of myth.':
    'Los Veinte Tronos se inclinan. Eres la mano que gira la rueda del mito.',

  /* ── aeons & stats ── */
  'The First Dawn': 'El Primer Amanecer',
  'The Gathering': 'La Reunión',
  'The Age of Temples': 'La Era de los Templos',
  'The Long Summer': 'El Largo Verano',
  'The Turning': 'El Giro',
  'The Age of Kings': 'La Era de los Reyes',
  'The Holy Wars': 'Las Guerras Santas',
  'The Quiet Sky': 'El Cielo Silencioso',
  'The Gilded Age': 'La Era Dorada',
  'The Last Silence': 'El Último Silencio',
  'The Starfall': 'La Lluvia de Estrellas',
  'Faith': 'Fe',
  'fe': 'fe',
  'Power': 'Poder',
  'power': 'poder',
  'Wisdom': 'Sabiduría',
  'Influence': 'Influencia',
  'Souls': 'Almas',
  'souls': 'almas',
  'Might': 'Poder',
  'Divine Might': 'Poder divino',
  'Souls in your care': 'Almas bajo tu cuidado',
  'Worshipping Races': 'Razas adoradoras',
  'Forge a race': 'Forja una raza',
  'Relics': 'Reliquias',
  'No relics yet. Make something holy.': 'Aún no hay reliquias. Crea algo sagrado.',
  'forged': 'forjadas',
  'Divine actions': 'Acciones divinas',
  'Chronicle': 'Crónica',
  'Newest first': 'Más recientes primero',
  'End Aeon': 'Terminar eón',
  'Let the world turn': 'Deja que el mundo gire',
  'The divine order': 'El orden divino',
  'The Twenty Thrones': 'Los Veinte Tronos',
  'Realm': 'Reino',
  'Self': 'Yo',
  'Thrones': 'Tronos',
  'Your standing': 'Tu posición',
  'of': 'de',
  'Aeon {n}': 'Eón {n}',
  'Aeon {n} · Omen': 'Eón {n} · Presagio',
  'Aeon {n} · Apotheosis': 'Eón {n} · Apoteosis',
  '{n} entries · Aeon {n2}': '{n} entradas · Eón {n2}',
  '{n} more might to become {name}': '{n} más de poder para convertirte en {name}',
  'The way to {name} is open.': 'El camino a {name} está abierto.',
  'The way to {name} is open': 'El camino a {name} está abierto',
  'You stand at the summit of the divine order.': 'Estás en la cima del orden divino.',
  'Ascend to {name}': 'Asciende a {name}',
  'The heavens are watching': 'Los cielos observan',
  'Ascend': 'Ascender',
  '{n} might required': 'Se requieren {n} de poder',
  'The summit is yours': 'La cima es tuya',
  'You are not yet mighty enough to ascend.': 'Aún no tienes poder suficiente para ascender.',
  'Age {age}': 'Edad {age}',
  '{mood} · {age} years': '{mood} · {age} años',
  'Mood: {mood} · Age {age}': 'Ánimo: {mood} · Edad {age}',
  'Serene': 'Sereno',
  'Triumphant': 'Triunfante',
  'Wrathful': 'Irascible',
  'Weary': 'Cansado',
  'Restless': 'Inquieto',
  'Ancient': 'Ancestral',
  'The years settle on your shoulders. Mortals begin to call you ancient.':
    'Los años se posan en tus hombros. Los mortales empiezan a llamarte antiguo.',
  'Your hair greys and your gaze deepens. Sixty years of prayers have carved you.':
    'Tu cabello encanece y tu mirada se vuelve más profunda. Sesenta años de plegarias te han tallado.',
  'Seventy-five years. Temples depict you with lines on your face, and it feels right.':
    'Setenta y cinco años. Los templos te representan con arrugas, y te parece justo.',
  'Ninety years. You are older than many gods, and far more patient.':
    'Noventa años. Eres más viejo que muchos dioses y mucho más paciente.',

  /* ── actions ── */
  'Answer Prayers': 'Responder plegarias',
  'Perform Miracle': 'Obrar un milagro',
  'Bless the Land': 'Bendecir la tierra',
  'Smite the Wicked': 'Castigar a los impíos',
  'Grant Prophecy': 'Conceder profecía',
  'Meditate in the Void': 'Meditar en el Vacío',
  'Sacred Festival': 'Festival sagrado',
  'Walk Among Mortals': 'Caminar entre mortales',
  'Forge a Relic': 'Forjar una reliquia',
  'Forge a Race': 'Forjar una raza',
  'Gain faith and a handful of devout souls.': 'Gana fe y un puñado de almas devotas.',
  'A great conversion of souls and influence.': 'Una gran conversión de almas e influencia.',
  'Steady growth among the common folk.': 'Crecimiento constante entre la gente común.',
  'Gain power and influence; fear costs a few souls.': 'Gana poder e influencia; el miedo cuesta algunas almas.',
  'Grow wisdom and influence among kings.': 'Aumenta tu sabiduría e influencia entre reyes.',
  'Deepen wisdom and divine power.': 'Profundiza tu sabiduría y poder divino.',
  'A costly but mighty surge of devotion.': 'Una oleada de devoción costosa pero poderosa.',
  'Learn what prayers never say. Gain influence.': 'Aprende lo que las plegarias nunca dicen. Gana influencia.',
  'Create a relic of lasting divine might.': 'Crea una reliquia de poder divino duradero.',
  'Create a custom race that worships you forever.': 'Crea una raza personalizada que te adore para siempre.',
  '{n} AP': '{n} PA',
  '{n} faith': '{n} de fe',
  '{n} power': '{n} de poder',
  'Requires {n} actions': 'Requiere {n} acciones',
  'Requires {n} faith': 'Requiere {n} de fe',
  'Requires {n} power': 'Requiere {n} de poder',
  'The heavens are not yet ready.': 'Los cielos aún no están listos.',
  'The forge demands more.': 'La forja exige más.',
  'Choose a race in the forge.': 'Elige una raza en la forja.',
  'Unknown action.': 'Acción desconocida.',
  'Not enough resources.': 'Recursos insuficientes.',
  '{n} more souls gather in your name.': '{n} almas más se reúnen en tu nombre.',
  'Aeon {n} begins · +{n2} souls': 'Comienza el eón {n} · +{n2} almas',
  'Four races already hold your name. The forge is closed.': 'Cuatro razas ya llevan tu nombre. La forja está cerrada.',
  'The {race} now worship you': 'El pueblo {race} ahora te adora',
  'The story moves on': 'La historia continúa',
  '+ Relic': '+ Reliquia',
  '+{n} Might': '+{n} de poder',
  '+18% Souls': '+18 % de almas',
  '+12 Faith': '+12 de fe',
  '+7 Power': '+7 de poder',
  '+7 Wisdom': '+7 de sabiduría',
  '+5 Influence': '+5 de influencia',
  '+{n} Faith': '+{n} de fe',
  '+{n} Power': '+{n} de poder',
  '+{n} Wisdom': '+{n} de sabiduría',
  '+{n} Influence': '+{n} de influencia',
  '{n}% Souls': '{n} % de almas',
  'YOU': 'TÚ',
  'You are outside the Twenty Thrones. <b>{n}</b> might.': 'Estás fuera de los Veinte Tronos. <b>{n}</b> de poder.',
  '#{n}': '#{n}',
  'of {n}': 'de {n}',
  'The world turns. {n} souls join your flock, and devotion gathers in the dark.':
    'El mundo gira. {n} almas se unen a tu rebaño, y la devoción se reúne en la oscuridad.',
  'Cults of {rival} swell in the night. Their might rises sharply.':
    'Los cultos de {rival} crecen en la noche. Su poder se dispara.',

  /* ── events & results ── */
  'Continue': 'Continuar',
  'You also gain the relic <b>{relic}</b>.': 'También obtienes la reliquia <b>{relic}</b>.',
  'The Twenty Thrones are silent. One by one, the elder powers incline their heads. The mortal world will tell this story until the last star burns out — the story of the god who climbed from a single prayer to the hand that turns the wheel of myth.':
    'Los Veinte Tronos guardan silencio. Uno a uno, los poderes antiguos inclinan la cabeza. El mundo mortal contará esta historia hasta que la última estrella se apague: la historia del dios que ascendió desde una sola plegaria hasta la mano que gira la rueda del mito.',
  'The summit of the divine order': 'La cima del orden divino',
  'Begin a New Myth': 'Comenzar un nuevo mito',
  'Continue Eternally': 'Continuar eternamente',
  'Take Your Place': 'Toma tu lugar',
  'The Chronicle Paused': 'Crónica en pausa',
  'Resume the chronicle': 'Reanudar la crónica',
  'Return to your divine work.': 'Vuelve a tu obra divina.',
  'The loop, the ranks, the throne.': 'El ciclo, los rangos, el trono.',
  'Sound: on': 'Sonido: activado',
  'Sound: off': 'Sonido: desactivado',
  'A little music between prayers.': 'Un poco de música entre plegarias.',
  'Save &amp; return to title': 'Guardar y volver al título',
  'Your chronicle is stored in this browser.': 'Tu crónica se guarda en este navegador.',
  'Begin a new myth': 'Comenzar un nuevo mito',
  'Cast this god aside and start over.': 'Deja a este dios de lado y empieza de nuevo.',
  'A clean slate': 'Una página en blanco',
  'Abandon This Myth?': '¿Abandonar este mito?',
  'Your current chronicle will be overwritten when you create a new god. The old story will be lost to the void.':
    'Tu crónica actual se sobrescribirá cuando crees un nuevo dios. La vieja historia se perderá en el vacío.',
  'Keep this chronicle': 'Conservar esta crónica',
  'Begin anew': 'Empezar de nuevo',
  'The divine handbook': 'El manual divino',
  '1 · Shape a god': '1 · Forja un dios',
  'Choose a face, body, eyes, hair, domain, lineage, and the first race that will worship you. Every choice changes both your portrait and your passives.':
    'Elige rostro, cuerpo, ojos, cabello, dominio, linaje y la primera raza que te adorará. Cada elección cambia tu retrato y tus pasivas.',
  '2 · Spend your aeons': '2 · Gasta tus eones',
  'Each aeon grants 3 divine actions. Answer prayers, work miracles, forge relics, or breathe a new race into being. When you end the aeon, your followers grow, your rivals grow, and an omen may demand a choice.':
    'Cada eón otorga 3 acciones divinas. Responde plegarias, obra milagros, forja reliquias o da vida a una nueva raza. Al terminar el eón, tus fieles crecen, tus rivales crecen y un presagio puede exigir una elección.',
  '3 · Ascend': '3 · Asciende',
  'Divine Might is your score. When it crosses the threshold, ascend to the next rank. Ascension grants a surge of power and extra actions at higher ranks.':
    'El Poder divino es tu puntuación. Cuando cruce el umbral, asciende al siguiente rango. La ascensión otorga una oleada de poder y acciones extra en rangos superiores.',
  '4 · Claim a throne': '4 · Reclama un trono',
  'The Twenty Thrones rank every god by Divine Might. Rivals scheme and grow every aeon. Reach <b style="color:var(--gold)">Supreme Architect</b> and stand above them all.':
    'Los Veinte Tronos clasifican a cada dios por su Poder divino. Los rivales conspiran y crecen cada eón. Alcanza el rango de <b style="color:var(--gold)">Arquitecto Supremo</b> y erige sobre todos.',
  '5 · Build a people': '5 · Construye un pueblo',
  'Forge custom races in the Genesis Forge. Each race adds permanent passive bonuses, and only four can hold your name.':
    'Forja razas personalizadas en la Forja del Génesis. Cada raza añade bonificaciones pasivas permanentes, y solo cuatro pueden llevar tu nombre.',
  'Return to the myth': 'Volver al mito',
  'The Genesis Forge': 'La Forja del Génesis',
  'Forge a New Race': 'Forja una nueva raza',
  'Clay, starlight, and a whispered name. Choose what kind of people will look up at you.':
    'Barro, luz de estrellas y un nombre susurrado. Elige qué clase de pueblo alzará la vista hacia ti.',
  'An Unnamed People': 'Un pueblo sin nombre',
  'Race name': 'Nombre de la raza',
  'e.g. The Glassborn': 'p. ej. Los Nacidovidrio',
  'Sigil': 'Sigilo',
  'Nature': 'Naturaleza',
  'A permanent passive for your god.': 'Una pasiva permanente para tu dios.',
  'Form': 'Forma',
  'Costs <b>2 actions</b>, <b>30 faith</b> and <b>12 power</b>. Grants <b>+18% souls</b> immediately.':
    'Cuesta <b>2 acciones</b>, <b>30 de fe</b> y <b>12 de poder</b>. Otorga <b>+18 % de almas</b> de inmediato.',
  'Leave the forge': 'Salir de la forja',
  'Breathe Life': 'Dar vida',
  'Humanoid': 'Humanoide',
  'Elven': 'Élfico',
  'Aquatic': 'Acuático',
  'Draconic': 'Dracónico',
  'Beastfolk': 'Pueblo bestia',
  'Starborn': 'Nacido de estrellas',
  'Dwarven': 'Enano',
  'Emberborn': 'Nacido del fuego',
  'A race of your making': 'Una raza creada por ti',
  'Your first people': 'Tu primer pueblo',
  'They build their lives around your name. Their prayers arrive with every dawn, and their gifts accumulate in the dark of your temple.':
    'Construyen sus vidas alrededor de tu nombre. Sus plegarias llegan con cada amanecer y sus ofrendas se acumulan en la oscuridad de tu templo.',
  'Faithful and true': 'Fieles y leales',
  'Adopted in Aeon {n}': 'Adoptada en el eón {n}',
  'Relic of your making': 'Reliquia creada por ti',
  'A piece of the world made holy. It remembers being something else, and it hums when you are angry.':
    'Un trozo del mundo hecho sagrado. Recuerda haber sido otra cosa y zumba cuando estás furioso.',
  'Forged by your hand': 'Forjada por tu mano',
  'Return it to the altar': 'Devuélvela al altar',
  'Withdraw': 'Retirarse',
  'MIGHT': 'PODER',
  'Cult growth +{n}% / aeon': 'Crecimiento del culto +{n} % / eón',
  '+{n}% follower growth': '+{n} % de crecimiento de fieles',
  '+{n} faith / aeon': '+{n} de fe / eón',
  '+{n} power / aeon': '+{n} de poder / eón',
  '+{n} wisdom / aeon': '+{n} de sabiduría / eón',
  '+{n} influence / aeon': '+{n} de influencia / eón',
  '{domain} deity': 'deidad de {domain}',
  'Iris': 'Iris',
  '{domain} domain': 'dominio de {domain}',
  '{race} adopted': '{race} adoptada',
  'Unknown': 'Desconocido',

  /* ── rival lore ── */
  'Their storms still answer to the old names. They resent new thunder.':
    'Sus tormentas aún responden a los nombres antiguos. Les molesta el trueno nuevo.',
  'They keep a ledger of every soul, including yours.': 'Llevan un registro de cada alma, incluida la tuya.',
  'They collect devotion the way other gods collect swords.': 'Coleccionan devoción como otros dioses coleccionan espadas.',
  'They have never lost a war. They are careful about which wars they start.': 'Nunca han perdido una guerra. Eligen con cuidado cuáles empiezan.',
  'They know what you are planning. They have known for some time.': 'Saben lo que planeas. Lo saben desde hace tiempo.',
  'Their forests grow in the shape of old promises.': 'Sus bosques crecen con la forma de viejas promesas.',
  'Their light exposes everything. They cast no shadow of their own.': 'Su luz lo expone todo. No proyectan sombra propia.',
  'They speak only in tides and omens.': 'Solo hablan en mareas y presagios.',
  'They taught the first lie to the first god.': 'Enseñaron la primera mentira al primer dios.',
  'They can unmake anything, including a reputation.': 'Pueden deshacer cualquier cosa, incluida una reputación.',
  'They remember the world before the shore.': 'Recuerdan el mundo antes de la costa.',
  'They have already seen how this ends. They are not telling.': 'Ya han visto cómo termina esto. No piensan decirlo.',
  'They watch your rise with the patience of something older than patience.':
    'Observan tu ascenso con la paciencia de algo más antiguo que la paciencia.',
  'Olympian': 'Olímpico',
  'Aesir': 'Aesir',
  'Vanir': 'Vanir',
  'Jotun': 'Jotun',
  'Heliopolitan': 'Heliopolitano',
  'Shinto': 'Sintoísta',
  'Vedic': 'Védico',
  'Aztec': 'Azteca',
  'Celtic': 'Celta',
  'Akan': 'Akan',
  'Mesopotamian': 'Mesopotámico',
  'Primeval': 'Primigenio',

  /* ── rival epithets ── */
  'The Thunderer': 'El Atronador',
  'The Grey-Eyed': 'La de Ojos Grises',
  'Keeper of Keys': 'Guardián de las Llaves',
  'Foam-Born': 'Nacida de la Espuma',
  'Sacker of Cities': 'Saqueador de Ciudades',
  'Earth-Shaker': 'El que Sacude la Tierra',
  'The Lamplit': 'El de la Lámpara',
  'The Unyielding': 'La Inflexible',
  'The Far-Shining': 'El que Brilla Lejos',
  'Throne-Keeper': 'Guardián del Trono',
  'All-Father': 'Padre de Todo',
  'Warden of Midgard': 'Guardián de Midgard',
  'Sky-Walker': 'Caminante del Cielo',
  'Mistress of Seiðr': 'Señora del Seiðr',
  'Half-Lit': 'Medio Iluminada',
  'The One-Handed': 'El Manco',
  'The Noon Sun': 'El Sol del Mediodía',
  'Guide of Souls': 'Guía de Almas',
  'Thousand-Named': 'De Mil Nombres',
  'Lord of Red Sands': 'Señor de las Arenas Rojas',
  'The Distant One': 'El Distante',
  'Heaven-Shining': 'Brillo del Cielo',
  'Storm of the Sea': 'Tormenta del Mar',
  'Thousand-Gated': 'De Mil Puertas',
  'The Cold Light': 'La Luz Fría',
  'The Dancer': 'El Danzante',
  'The Black Mother': 'La Madre Negra',
  'The Preserver': 'El Preservador',
  'Vajra-Bearer': 'Portador del Vajra',
  'Feathered Serpent': 'Serpiente Emplumada',
  'Smoking Mirror': 'Espejo Humeante',
  'He Who Makes Things Sprout': 'Aquel que Hace Brotar las Cosas',
  'Phantom Queen': 'Reina Fantasma',
  'The Good God': 'El Buen Dios',
  'Flame of the Forge': 'Llama de la Forja',
  'The Story-Spinner': 'El Tejedor de Historias',
  'Lord of the Air': 'Señor del Aire',
  'Queen of Heaven': 'Reina del Cielo',
  'Dragon-Slayer': 'Matadragones',
  'The First Night': 'La Primera Noche',

  /* ── default epithets ── */
  'The Stormlord': 'El Señor de la Tormenta',
  'Keeper of the Last Door': 'Guardián de la Última Puerta',
  'The Golden Flame': 'La Llama Dorada',
  'The Red Banner': 'El Estandarte Rojo',
  'The Verdant Hand': 'La Mano Verde',
  'The Dawnbringer': 'El Portador del Alba',
  'The Silver Veil': 'El Velo de Plata',
  'The Laughing Shadow': 'La Sombra que Ríe',
  'The Shaper': 'El Modelador',
  "The Deep's Voice": 'La Voz de las Profundidades',
  'The Unmoved Hour': 'La Hora Inmóvil',
  'The Nameless': 'El Sin Nombre',
  'The New Order': 'El Nuevo Orden',
  'Relic': 'Reliquia',
  'Domain of': 'Dominio de',
  'Worshipped by': 'Adorado por',
  'Visit your village': 'Visita tu aldea',
  'See the mortal world beneath your skies': 'Contempla el mundo mortal bajo tus cielos',
  'The mortal realm': 'El reino mortal',
  'Your village': 'Tu aldea',
  '← Return to realm': '← Volver al reino',
  'Village': 'Aldea',
  'A humble settlement': 'Un humilde asentamiento',
  'A growing village': 'Una aldea en crecimiento',
  'A flourishing town': 'Una ciudad floreciente',
  'A settlement beneath your divine light': 'Un asentamiento bajo tu luz divina',
  'From your shrine, the mortal world grows with your followers.': 'Desde tu santuario, el mundo mortal crece junto a tus seguidores.',
  'Divine domain': 'Dominio divino',
  'The village changes as your following grows. Return to the realm to shape its future.': 'La aldea cambia a medida que crecen tus seguidores. Vuelve al reino para forjar su futuro.'
};

export function t(key, vars) {
  const dict = lang === 'es' ? ES : null;
  let out = (dict && Object.prototype.hasOwnProperty.call(dict, key)) ? dict[key] : key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.split('{' + name + '}').join(String(value));
    }
  }
  return out;
}

export function applyStatic(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
    if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', t(el.dataset.i18nTitle));
  });
  document.documentElement.lang = lang;
  document.title = lang === 'es' ? 'GODSPIRE — Un simulador de vida divina' : 'GODSPIRE — A God Life Simulator';
}

/* Spanish action-result chronicle lines, keyed by action id. */
export const ACTION_TEXT_ES = {
  prayers: 'Mil susurros se alzan del mundo mortal. Escuchas, y los fieles se sienten oídos.',
  miracle: 'Tejes lo imposible y lo haces existir. Contarán esta historia durante mil años.',
  bless: 'La lluvia cae suave sobre campos que habían olvidado el verde. Los granjeros dejan pan en tus piedras.',
  smite: 'El cielo se rompe una vez. Los impíos son deshechos, y todos los demás recuerdan tu nombre.',
  prophecy: 'Hablas de lo que ha de venir. Los reyes anotan cada palabra y las reinas esconden las que temen.',
  meditate: 'Te retiras al silencio entre las estrellas. Al volver, el mundo parece más pequeño y tu voluntad, más antigua.',
  festival: 'Por una noche, cada hogar arde en tu honor. Las canciones sobrevivirán a quienes las cantan.',
  walk: 'Vistes un rostro mortal y caminas entre ellos. Alguien comparte contigo su último pan, sin saber lo que eres.',
  relic: 'Tomas un trozo del mundo y lo haces sagrado. Nace {relic}.'
};

/* Full Spanish event content, keyed by stable event id. */
export const EVENT_ES = {
  prayer: {
    title: 'Una plegaria en la oscuridad',
    text: 'Un niño moribundo te reza por tu nombre. No hay ningún sacerdote. Ningún templo cerca. Solo una pequeña voz que te pide que detengas la fiebre.',
    choices: [
      { label: 'Responder a la plegaria', result: 'La fiebre se rompe. Al amanecer, el pueblo te ha construido un santuario con leña y asombro.' },
      { label: 'Enviar una señal silenciosa', result: 'Una polilla blanca se posa en la almohada del niño. La familia lo entiende, aunque no sepa explicar por qué.' },
      { label: 'Dejar girar la rueda', result: 'El niño fallece. Aprendes algo con forma de duelo sobre los mortales, y la lección se asienta en tus huesos.' }
    ]
  },
  drought: {
    title: 'La larga sequía',
    text: 'Los ríos se han reducido a hilos marrones. Tu pueblo se reúne en el cauce seco y canta hasta que se le rompe la voz.',
    choices: [
      { label: 'Romper el cielo', result: 'Llueve durante nueve días. El río vuelve con peces, y los cantos se vuelven más fuertes.' },
      { label: 'Exigir un sacrificio', result: 'Te entregan un toro y su mejor vino. La lluvia llega tarde. Algunos te perdonan. Otros no.' },
      { label: 'Enseñarles a cavar', result: 'Aparecen pozos en cada aldea. Aprenden que tus dones a veces son instrucciones.' }
    ]
  },
  herald: {
    title: 'El heraldo de un rival',
    text: 'Un heraldo con los colores de {rival} llega a tu templo. «Mi señor te ofrece un lugar en su mesa», dice, «si doblas la rodilla».',
    choices: [
      { label: 'Desafiar al rival', result: 'Envías al heraldo a casa con los zapatos llenos de truenos. La historia se difunde más rápido que cualquier sermón.' },
      { label: 'Aceptar la oferta', result: 'Te sientas a su mesa y no dices nada. Una semana después, dos de sus cultos empiezan a rezar en silencio a ti.' },
      { label: 'Sobornar al heraldo', result: 'El heraldo se marcha rico y comprometido. Su señor nunca sabrá lo que se dijo en tu salón.' }
    ]
  },
  idol: {
    title: 'El ídolo destrozado',
    text: 'Un rayo golpea tu estatua más grande durante un festival. Su rostro yace en pedazos a los pies de una multitud atónita. Alzan la vista, esperando ver qué haces ante esta ofensa.',
    choices: [
      { label: 'Reconstruirlo el doble de alto', result: 'El andamio cubre la plaza durante un año. Cuando retiran la tela, el nuevo ídolo proyecta su sombra sobre el palacio.' },
      { label: 'Dejar que queden las ruinas', result: 'Dejas que conserven el rostro roto. Llegan peregrinos a tocar las grietas. Se convierte en lo más sagrado que posees.' },
      { label: 'Repararlo con luz', result: 'La piedra se alza y se une ante diez mil testigos. No hay palabra para el sonido que emiten.' }
    ]
  },
  heresy: {
    title: 'La herejía del profeta',
    text: 'Un profeta errante afirma que solo eres el sirviente de un dios mayor. Sus sermones son hermosos. La mitad de tu sacerdocio lo escucha.',
    choices: [
      { label: 'Debatir con el profeta', result: 'Te reúnes con él bajo un olivo durante tres días. Al cuarto, el profeta llora y admite que nunca estuvo seguro.' },
      { label: 'Derribarlo', result: 'El profeta cae al mediodía. Sus seguidores se dispersan, pero sus palabras se entierran y echan raíces.' },
      { label: 'Bendecir su ministerio', result: 'Bendices públicamente al profeta. Confundido, pasa el resto de su vida intentando explicar por qué.' }
    ]
  },
  star: {
    title: 'Cae una estrella',
    text: 'Algo arde en la noche y aterriza en las colinas. El aire sabe a hierro y a luz antigua. Tus sacerdotes preguntan qué significa.',
    choices: [
      { label: 'Reclamarla como tu señal', result: 'Alzas la estrella caída sobre una columna de piedra negra. Los otros dioses empiezan a enviar espías.' },
      { label: 'Estudiar su naturaleza', result: 'Es más antigua que el mundo. Pasas una estación aprendiendo su idioma, y te enseña una sola verdad.' },
      { label: 'Sellarla', result: 'La entierras profundamente y ordenas a una orden silenciosa vigilar el suelo. Algunas puertas son más sagradas cerradas.' }
    ]
  },
  queen: {
    title: 'La reina mortal',
    text: 'Una reina que no cree en ti envía un emisario. Te ofrece una alianza: sus ejércitos, sus caminos, su plata, si bendices solo a su dinastía.',
    choices: [
      { label: 'Aceptar la alianza', result: 'Sus legiones marchan bajo tu sigilo. Los sacerdotes refunfuñan, pero las bandejas de las ofrendas pesan.' },
      { label: 'Rechazar el trono', result: 'Bendices a los mendigos de su ciudad. Te cuesta una reina y te gana diez mil pequeños creyentes.' },
      { label: 'Probar su devoción', result: 'Le pides que renuncie a algo que ama. Lo hace. No sabes si impresionarte o temer.' }
    ]
  },
  shard: {
    title: 'La forja de los caídos',
    text: 'En las ruinas de la forja de un dios antiguo, encuentras un fragmento de algo anterior al lenguaje. Zumba cuando lo tocas.',
    choices: [
      { label: 'Forjarlo en una reliquia', result: 'El fragmento bebe tu sangre y se convierte en algo nuevo. Recuerda haber sido una estrella.' },
      { label: 'Dárselo a tus herreros', result: 'Tus herreros mortales hacen maravillas con las virutas. Nunca sabrán con qué trabajaban.' },
      { label: 'Devolverlo a la tierra', result: 'Lo entierras donde cayó el dios antiguo. Esa noche sueñas con una mano que se cierra sobre la tuya.' }
    ]
  },
  flood: {
    title: 'El mar recuerda',
    text: 'Una inundación se alza contra la costa. No es el clima. Algo bajo el agua arrastra el océano hacia tus ciudades como una manta.',
    choices: [
      { label: 'Contener el mar', result: 'Te plantas en el malecón durante tres días, y el agua se arrodilla. La costa contará esta historia para siempre.' },
      { label: 'Dejar que limpie la costa', result: 'Los viejos puertos se ahogan. Lo que sobrevive es más delgado, más duro y mucho más devoto.' },
      { label: 'Negociar con las profundidades', result: 'Hablas con lo que vive abajo. Acepta tus términos y pide un nombre, que no le das.' }
    ]
  },
  prophecy: {
    title: 'Una criatura de la profecía',
    text: 'Nace un niño bajo tres lunas. Cada templo de la región reclama el nacimiento como suyo. La madre del niño solo reza a ti.',
    choices: [
      { label: 'Bendecir al niño', result: 'Tocas la cuna. El niño crecerá para unir una nación, y olvidará tu nombre durante veinte años.' },
      { label: 'Llevarte al niño', result: 'Tus sacerdotes lo crían en el templo alto. Es brillante, obediente y terriblemente solitario.' },
      { label: 'Esconder al niño', result: 'Borras todos los presagios. El niño crece como pescador, feliz y corriente. Nunca le dices a nadie por qué.' }
    ]
  },
  empty: {
    title: 'El templo vacío',
    text: 'El gran templo está medio vacío esta noche. Las canciones son las mismas, pero la sala no. La fe es un fuego, y el tuyo arde bajo.',
    choices: [
      { label: 'Obrar un milagro público', result: 'Curas toda la plaza. Al anochecer, el templo está de pie y los sacerdotes tienen la voz ronca.' },
      { label: 'Predicar una verdad más dura', result: 'Les dices lo que eres en realidad. Algunos se van. Los que se quedan nunca volverán a irse.' },
      { label: 'Abrir las puertas a todos', result: 'Derribas la cuota de entrada y las marcas de casta. Las familias antiguas están furiosas. Las calles están llenas.' }
    ]
  },
  moons: {
    title: 'Las lunas gemelas se alinean',
    text: 'Dos lunas se ponen hombro con hombro por primera vez en novecientos años. El aire es fino y brillante. Todos los oráculos del mundo están despiertos.',
    choices: [
      { label: 'Meditar bajo ellas', result: 'Te sientas en la luz plateada hasta que tus pensamientos se callan. Algo antiguo se sienta a tu lado.' },
      { label: 'Declarar un gran festival', result: 'Vacíos los templos a las calles. Dentro de novecientos años, seguirán bailando.' },
      { label: 'Leer el presagio', result: 'El presagio no trata de ti. Trata de lo que viene después de ti. Decides no contárselo a nadie.' }
    ]
  },
  dying: {
    title: 'Un dios está muriendo',
    text: '{rival} no ha respondido a una plegaria en un año. Sus cultos pasan hambre. Venden sus templos para hacer tejas. Un emisario te pregunta si aceptarás a sus fieles restantes.',
    choices: [
      { label: 'Absorber sus cultos', result: 'Aceptas a los hambrientos y a los asustados. Algunos aún susurran el nombre antiguo cuando creen que no escuchas.' },
      { label: 'Enviarles ayuda', result: 'Alimentas al rebaño de un rival en tu nombre y no pides nada. Es lo más aterrador que has hecho.' },
      { label: 'Dejarlos desvanecerse', result: 'Un dios muere en la oscuridad. Sientes el vacío como un diente arrancado, y algo en el cosmos se inclina hacia ti.' }
    ]
  },
  crown: {
    title: 'La corona del vacío',
    text: 'Una corona de ninguna materia aparece en tu altar. No pesa. Cuando la miras, recuerdas haber sido nada, y cuánto te gustaba.',
    choices: [
      { label: 'Ponerla', result: 'La corona se asienta. Todo se vuelve muy claro y muy lejano. Tus sacerdotes dicen que tu sombra ya no cae en la dirección correcta.' },
      { label: 'Romperla', result: 'Se hace añicos sin sonido. Sientes al vacío estremecerse, y luego olvidarte por completo.' },
      { label: 'Esconderla', result: 'La entierras bajo una montaña con siete sellos. El octavo sello lo guardas en el pecho, donde nadie puede llegar.' }
    ]
  },
  bones: {
    title: 'Los huesos de un dios antiguo',
    text: 'Encuentran el esqueleto de un dios que murió antes de la invención del arado. Sus costillas se arquean sobre un valle como las vigas de una catedral en ruinas.',
    choices: [
      { label: 'Construir un santuario entre las costillas', result: 'Los peregrinos caminan por el pecho del dios muerto y dejan ofrendas en su sombra. No parece importarle.' },
      { label: 'Estudiar los restos', result: 'De los huesos aprendes la forma de un dios al que nadie recuerda. Escribes su nombre antes de que desaparezca.' },
      { label: 'Devorar su poder', result: 'Tomas lo que queda. El valle enmudece. Durante una semana, tus sueños no son tuyos.' }
    ]
  },
  plague: {
    title: 'La tos gris',
    text: 'Una plaga cruza tus ciudades. No respeta la plegaria. Tus sacerdotes mueren junto a las personas a las que bendicen.',
    choices: [
      { label: 'Curar a los enfermos', result: 'Te consumes contra la plaga durante una estación. Salvas a la mayoría. Recuerdas cada rostro que pierdes.' },
      { label: 'Poner en cuarentena las ciudades', result: 'Tus órdenes son brutales y eficaces. La plaga se rompe. Los supervivientes discutirán el costo durante generaciones.' },
      { label: 'Dejar que arrase', result: 'La plaga se lleva a un tercio de ellos. El resto reza más fuerte que nunca, con la devoción particular de los perdonados.' }
    ]
  },
  titan: {
    title: 'El titán errante',
    text: 'Un titán de las guerras antiguas atraviesa tu territorio. No se detiene ante los templos. Ni siquiera parece verlos.',
    choices: [
      { label: 'Enfrentarlo en batalla', result: 'Luchas un día y una noche. El titán se arrodilla al anochecer. Tu pueblo construye una colina con las piedras caídas.' },
      { label: 'Guiarlo lejos', result: 'Caminas a su lado durante cien millas, cantando las canciones antiguas. Gira hacia el sur, lejos de tus ciudades, y nunca regresa.' },
      { label: 'Ocultar a tu pueblo', result: 'Extiendes una niebla sobre las ciudades. El titán atraviesa tu tierra y solo ve colinas vacías.' }
    ]
  },
  conclave: {
    title: 'La asamblea de los dioses',
    text: '{rival} convoca a las potencias divinas para resolver una disputa ancestral. Tu nombre figura en la invitación, aunque nadie admite quién lo añadió.',
    choices: [
      { label: 'Hablar por los dioses jóvenes', result: 'Das voz a los dioses sin trono. Los antiguos lo llaman insolencia; los demás, un comienzo.' },
      { label: 'Desafiar al anfitrión', result: 'Llamas cobarde al anfitrión ante toda la asamblea. Acepta el desafío, y todos los tronos se vuelven a mirar.' },
      { label: 'Irte con el secreto', result: 'Descubres la verdadera causa de la disputa y te marchas antes de que alguien pueda preguntar qué sabes.' }
    ]
  },
  'true-name': {
    title: 'El nombre bajo tu nombre',
    text: 'Un oráculo pronuncia un nombre que ningún mortal debería conocer. Por todo el mundo, tus santuarios más antiguos responden con una luz que no veías desde tu primera plegaria.',
    choices: [
      { label: 'Reclamar el nombre', result: 'El nombre se asienta en ti como un segundo latido. Cada santuario resplandece, y todos los rivales sienten el cambio.' },
      { label: 'Entregárselo a tus sacerdotes', result: 'Tus sacerdotes protegen las sílabas en un nuevo himno sagrado. Peregrinos de tierras lejanas viajan para aprender el estribillo.' },
      { label: 'Volver a enterrarlo', result: 'Sellas el nombre bajo el primer altar que levantaste. El oráculo lo olvida antes del amanecer.' }
    ]
  },
  'mortal-apotheosis': {
    title: 'Un mortal aspira al cielo',
    text: 'Un héroe amado rechaza la corona que ofrecen tus sacerdotes y declara que los mortales no necesitan dioses. Sus palabras conmueven, y tus templos escuchan.',
    choices: [
      { label: 'Alzarlo como semidiós', result: 'Compartes con él una chispa divina. El nuevo semidiós no se arrodilla ante nadie, pero permanece a tu lado.' },
      { label: 'Debatir ante el pueblo', result: 'Os encontráis bajo el cielo abierto. Ninguno vence, y el pueblo se marcha con mejores preguntas.' },
      { label: 'Dejar crecer su leyenda', result: 'No intervienes. Su leyenda crece, y tu pueblo aprende que la fe ofrecida libremente vale más.' }
    ]
  },
  'divine-envoy': {
    title: 'Un emisario tras el velo',
    text: 'Llega un mensajero de un reino más allá de la vista mortal, con un tratado firmado por dioses cuyas constelaciones desaparecieron antes de la primera aurora.',
    choices: [
      { label: 'Firmar el tratado', result: 'La tinta arde con frialdad. En algún lugar tras el velo, una potencia antigua ya conoce tu nombre.' },
      { label: 'Exigir un don divino', result: 'El emisario deja una gota de fuego estelar en tu palma y te advierte que nunca debes derramarla.' },
      { label: 'Despedir al emisario', result: 'Te niegas a atar tu destino a un panteón desaparecido. El mensajero se inclina, casi con alivio.' }
    ]
  },
  'omen-1': {
    title: 'Un presagio tranquilo',
    text: 'Un ciervo blanco atraviesa tu templo al amanecer y se va sin dejar huellas. Los sacerdotes discuten qué significa.',
    choices: [
      { label: 'Leerlo como una bendición', result: 'Dejas que crean que fue una bendición. A veces, creer es lo importante.' },
      { label: 'Seguir al ciervo', result: 'Te lleva a un manantial que ayer no existía. Bebes y comprendes algo nuevo.' }
    ]
  },
  'omen-2': {
    title: 'Una cosecha generosa',
    text: 'La cosecha es tan abundante que los graneros revientan. Tu pueblo te lo atribuye. En su mayoría, tiene razón.',
    choices: [
      { label: 'Declarar un festín', result: 'El festín dura una semana. Tres matrimonios y una guerra comienzan en tu mesa.' },
      { label: 'Guardar el excedente', result: 'Los silos se llenan. Cuando lleguen los años flacos, recordarán quién les dijo que ahorraran.' }
    ]
  },
  'omen-3': {
    title: 'El camino de los peregrinos',
    text: 'Se abre un nuevo camino entre dos de tus ciudades sagradas. Comerciantes, mendigos y curiosos empiezan a fluir por él.',
    choices: [
      { label: 'Bendecir a los viajeros', result: 'Tu nombre viaja más rápido que cualquier ejército. Llega a lugares de los que nunca has oído hablar.' },
      { label: 'Construir hitos', result: 'Cada milla tiene una piedra con tu sigilo. El camino mismo se convierte en una plegaria lenta.' }
    ]
  }
};

export function localizedEvent(ev) {
  if (lang !== 'es' || !ev) return ev;
  const es = EVENT_ES[ev.id];
  if (!es) return ev;
  const swap = str => (str || '').split('{rival}').join(ev.rivalName || 'un dios rival');
  return {
    ...ev,
    title: swap(es.title),
    text: swap(es.text),
    choices: ev.choices.map((c, i) => ({
      ...c,
      label: (es.choices[i] && es.choices[i].label) || c.label,
      result: swap((es.choices[i] && es.choices[i].result) || c.result)
    }))
  };
}
