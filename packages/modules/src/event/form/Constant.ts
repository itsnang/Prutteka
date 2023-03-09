import { getCurrentTime, getToday } from './helper';

const TYPES = {
  physical: { en: 'Physical', kh: 'ព្រឹត្តិការណ៍ផ្ទាល់' },
  online: { en: 'Online', kh: 'ព្រឹត្តិការណ៍អនឡាញ' },
};

const CATEGORIES = {
  free: { en: 'Free', kh: 'ឥតគិតថ្លៃ' },
  online: { en: 'Online', kh: 'អនឡាញ' },
  education: { en: 'Education', kh: 'អប់រំ' },
  sport: { en: 'Sport', kh: 'កីឡា' },
  music: { en: 'Music', kh: 'តន្ត្រី' },
  exhibition: { en: 'Exhibition', kh: 'ពិព័រណ៍' },
  technology: { en: 'Technology', kh: 'បច្ចេកវិទ្យា' },
  charity: { en: 'Charity', kh: 'សប្បុរធម៌' },
};

const LOCATIONS = {
  'phnom-penh': { en: 'Phnom Penh', kh: 'ភ្នំពេញ' },
  'banteay-meanchey': { en: 'Banteay Meanchey', kh: 'បន្ទាយមានជ័យ' },
  battambang: { en: 'Battambang', kh: 'បាត់ដំបង' },
  'kampong-cham': { en: 'Kampong Cham', kh: 'កំពង់ចាម' },
  'kampong-chhnang': { en: 'Kampong Chhnang', kh: 'កំពង់ឆ្នាំង' },
  'kampong-speu': { en: 'Kampong Speu', kh: 'កំពង់ស្ពឺ' },
  kampo: { en: 'Kampot', kh: 'កំពត' },
  kandal: { en: 'Kandal', kh: 'កណ្តាល' },
  kep: { en: 'Kep', kh: 'កែប' },
  'koh-kong': { en: 'Koh Kong', kh: 'កោះកុង' },
  kratie: { en: 'Kratie', kh: 'ក្រចេះ' },
  mondulkiri: { en: 'Mondulkiri', kh: 'មណ្ឌលគិរី' },
  'oddor-meanchey': { en: 'Oddor Meanchey', kh: 'ឧត្តរមានជ័យ' },
  pailin: { en: 'Pailin', kh: 'បៃលិន' },
  'prev-veng': { en: 'Prey Veng', kh: 'ព្រៃវែង' },
  pursat: { en: 'Pursat', kh: 'ពោធិ៍័សាត់' },
  rattanakiri: { en: 'Rattanakiri', kh: 'រតនគិរី' },
  'siem-reap': { en: 'Siem Reap', kh: 'សៀមរាប' },
  'sihanouk-ville': { en: 'Sihanouk Ville', kh: 'ព្រះសីហនុ' },
  'stung-treng': { en: 'Stung Treng', kh: 'ស្ទឹងត្រែង' },
  'svay-rieng': { en: 'Svay Rieng', kh: 'ស្វាយរៀង' },
  takeo: { en: 'Takeo', kh: 'តាកែវ' },
  'kampong-thom': { en: 'Kampong Thom', kh: 'កំពង់ធំ' },
  'preah-vihear': { en: 'Preah Vihear', kh: 'ព្រះវិហារ' },
  'tbong-khmum': { en: 'Tbong Khmum', kh: 'ត្បូងឃ្ម៉ំ' },
};

const INITIAL_VALUES = {
  details: {
    name: { en: '', kh: '' },
    type: Object.keys(TYPES)[0],
    category: Object.keys(CATEGORIES)[0],
    location: Object.keys(LOCATIONS)[0],
    detail: { en: '', kh: '' },
    img: '',
    nestedEvents: false,
  },

  datetime: {
    start_date: getToday(),
    end_date: getToday(),
    start_time: getCurrentTime(),
    end_time: getCurrentTime(),
    hasCustomTime: false,
    customTimes: [{ start_time: getCurrentTime(), end_time: getCurrentTime() }],
  },

  locations: [{ name: { en: '', kh: '' }, link: '' }],

  schedule: {
    hasCustomSchedule: false,
    sharedSchedules: [
      {
        start_time: getCurrentTime(),
        end_time: getCurrentTime(),
        activity: { en: '', kh: '' },
      },
    ],
    customSchedules: [
      {
        date: undefined,
        schedules: [
          {
            start_time: getCurrentTime(),
            end_time: getCurrentTime(),
            activity: { en: '', kh: '' },
          },
        ],
      },
    ],
  },

  joinMethods: [{ name: { en: '', kh: '' }, link: '' }],
};

const t = {
  eventDetails: { en: 'Event Details', kh: 'ព័ត៌មានលម្អិត' },
  dragAndDrop: { en: 'Drag and drop or', kh: 'ទម្លាក់រូបភាពលើទីនេះ ឬ' },
  uploadImage: { en: 'Upload Image', kh: 'បង្ហោះរូបភាព' },
  upTo10mb: { en: 'up to 10mb', kh: 'ធំបំផុត ១០mb' },
  eventName: { en: 'Event name', kh: 'ឈ្មោះព្រឹត្តិការណ៍' },
  type: { en: 'Type', kh: 'ព្រឹត្តិការណ៍ផ្ទាល់ឬអនឡាញ' },
  category: { en: 'Category', kh: 'ប្រភេទនៃព្រឹត្តិការណ៍' },
  location: { en: 'Location', kh: 'ទីកន្លែង' },
  details: { en: 'Event Details', kh: 'ពិពណ៌នាពីព្រឹត្តិការណ៍' },
  nestedEvents: { en: 'Nested Event', kh: 'Nested Event' },
  thisEventContainsOtherEvent: {
    en: 'This event contains other events within it',
    kh: 'This event contains other events within it',
  },
  dateAndTime: { en: 'Date and Time', kh: 'កាលបរិច្ឆេទ និង ពេលវេលា' },
  start_date: { en: 'Start Date', kh: 'ថ្ងៃចាប់ផ្តើម' },
  end_date: { en: 'End Date', kh: 'ថ្ងៃបញ្ចប់' },
  start_time: { en: 'Start Time', kh: 'ម៉ោងចាប់ផ្តើម' },
  end_time: { en: 'End Time', kh: 'ម៉ោងបញ្ចប់' },
  customDateAndTime: {
    en: 'Custom date and time (Different start and end time for each date)',
    kh: 'ពេលវេលាខុសគ្នាសម្រាប់ថ្ងៃនីមួយៗ',
  },
  invalidDateTime: {
    en: 'Please provide valid start date and end date for your event above',
    kh: 'សូមបំពេញថ្ងៃចាប់ផ្តើមនិងថ្ងៃបញ្ចប់ឲ្យបានត្រឹមត្រូវ',
  },
  locationInfo: { en: 'Location Info', kh: 'ទីតាំងនៃព្រឹត្តិការណ៍' },
  locationName: { en: 'Location name', kh: 'ឈ្មោះទីតាំង' },
  locationLink: {
    en: 'Location link (e.g Google maps)',
    kh: 'តំណភ្ជាប់ (ឧ. Google maps)',
  },
  locationLinkPlaceholder: { en: 'Location link', kh: 'តំណភ្ជាប់' },
  addMoreLocation: { en: 'Add more location', kh: 'បន្ថែមទីតាំងផ្សេងទៀត' },
  schedule: { en: 'Schedule', kh: 'កាលវិភាគ' },
  activity: { en: 'Activity', kh: 'សកម្មភាព' },
  addMoreSchedule: { en: 'Add more schedule', kh: 'បន្ថែមកាលវិភាគ' },
  customSchedule: {
    en: 'Custom schedule (Different schedule for each date)',
    kh: 'កាលវិភាគផ្សេងៗគ្នាសម្រាប់ថ្ងៃនីមួយៗ',
  },
  howToJoin: { en: 'How to join', kh: 'វិធីចូលរួមព្រឹត្តិការណ៍' },
  method: { en: 'Method', kh: 'មធ្យោបាយចូលរួម' },
  link: { en: 'Link', kh: 'តំណភ្ជាប់ (បើមាន)' },
  addMoreMethod: { en: 'Add more method', kh: 'បន្ថែមមធ្យោបាយផ្សេងទៀត' },
  submitEvent: { en: 'Submit Event', kh: 'បង្ហោះព្រឹត្តិការណ៍' },
};

export { LOCATIONS, CATEGORIES, INITIAL_VALUES, TYPES, t as TRANSLATION };
