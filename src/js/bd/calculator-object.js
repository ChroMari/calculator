const objCalculator = [ // нужно будет клавиши коды для всех подправить
  {
    action: ['data-action', 'allClear'],
    textElement: 'AC',
    key: ['data_key', 'Delete'],
  },
  {
    action: ['data-action', 'delete'],
    textElement: 'DEL',
    key: ['data_key', 'Backspace'],
  },
  {
    action: ['data-action', 'operation'],
    textElement: '^',
    key: ['data_key', 'Digit6'],
  },
  {
    action: ['data-action', 'operation'],
    textElement: '*/*',
    key: ['data_key', 'NumpadDivide'],
  },

  {
    action: ['data-action', 'number'],
    textElement: '1',
    key: ['data_key', 'Numpad1'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '2',
    key: ['data_key', 'Numpad2'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '3',
    key: ['data_key', 'Numpad3'],
  },
  {
    action: ['data-action', 'operation'],
    textElement: '*',
    key: ['data_key', 'NumpadMultiply'],
  },

  {
    action: ['data-action', 'number'],
    textElement: '4',
    key: ['data_key', 'Numpad4'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '5',
    key: ['data_key', 'Numpad5'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '6',
    key: ['data_key', 'Numpad6'],
  },
  {
    action: ['data-action', 'operation'],
    textElement: '+',
    key: ['data_key', 'NumpadAdd'],
  },

  {
    action: ['data-action', 'number'],
    textElement: '7',
    key: ['data_key', 'Numpad7'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '8',
    key: ['data_key', 'Numpad8'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '9',
    key: ['data_key', 'Numpad9'],
  },
  {
    action: ['data-action', 'operation'],
    textElement: '-',
    key: ['data_key', 'NumpadSubtract'],
  },

  {
    action: ['data-action', 'number'],
    textElement: '.',
    key: ['data_key', 'NumpadDecimal'],
  },
  {
    action: ['data-action', 'number'],
    textElement: '0',
    key: ['data_key', 'Numpad0'],
  },
  {
    action: ['data-action', 'equals'],
    textElement: '=',
    key: ['data_key', 'NumpadEnter'],
  },
  {
    action: ['data-action', 'sqrt'],
    textElement: 'sq',
    key: ['data_key', 'Digit7'],
  },
];

export default objCalculator;
