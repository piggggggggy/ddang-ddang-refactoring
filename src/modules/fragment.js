export const questFragment = (type) => {
  switch (type) {
    case "mob":
      return {
        color: '#EB6042',
        subColor: '#F3AC9C',
      }
    case "time":
      return {
        color: '#61B7FA',
        subColor: '#A3D4FB',
      }
    case "feed":
      return {
        color: '#EDEA50',
        subColor: '#F9F7A7',
      }
    default:
      return {
        color: '#EB6042',
        subColor: '#F3AC9C',
      }
  }
}