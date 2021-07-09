export function n3rgyDateToISODate(date: string): string {
  const dateTimeRegex = /([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])(2[0-3]|[01][0-9])([0-5][0-9])/ // yyyyMMddHHmm
  if (date.match(dateTimeRegex)) {
    return date.replace(dateTimeRegex, '$1-$2-$3T$4:$5:00.000Z')
  }

  const dateOnlyRegex = /([0-9]{4})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/ // yyyyMMdd
  if (date.match(dateOnlyRegex)) {
    return date.replace(dateOnlyRegex, '$1-$2-$3T00:00:00.000Z')
  }

  const dateTimeDashedRegex = /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):([0-5][0-9])/ // yyyy-MM-dd HH:mm
  if (date.match(dateTimeDashedRegex)) {
    return date.replace(dateTimeDashedRegex, '$1-$2-$3T$4:$5:00.000Z')
  }

  const dateOnlyDashedRegex = /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/ // yyyy-MM-dd
  if (date.match(dateOnlyDashedRegex)) {
    return date.replace(dateOnlyDashedRegex, '$1-$2-$3T00:00:00.000Z')
  }

  return date
}