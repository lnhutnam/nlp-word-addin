import dict from '!!raw-loader!./vndict.txt';

export function loadDict() {
  return dict.split('\n').map(word => word.trim());
}
