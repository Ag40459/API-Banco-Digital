function validateCPF(cpf) {
    let Sum = 0
    let Rest

    let strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
        Sum = Sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Rest = (Sum * 10) % 11

    if ((Rest == 10) || (Rest == 11))
        Rest = 0

    if (Rest != parseInt(strCPF.substring(9, 10)))
        return false

    Sum = 0

    for (i = 1; i <= 10; i++)
        Sum = Sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Rest = (Sum * 10) % 11

    if ((Rest == 10) || (Rest == 11))
        Rest = 0

    if (Rest != parseInt(strCPF.substring(10, 11)))
        return false

    return true
}

module.exports = {
    validateCPF
}