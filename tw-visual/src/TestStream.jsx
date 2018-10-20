import testTransfers from './sample_data/transfers.json'
import recipients from './sample_data/recipient.json'
import senders from './sample_data/profile-service.json'

function* testStream() {
    const recipientsById = getRecipientsById();
    const sendersById = getSendersById();
    while (true) {
        for (var element in testTransfers) {
            var transfer = testTransfers[element];
            var result = {
                ...transfer,
                recipient: recipientsById[transfer.recipient_id],
                sender: sendersById[transfer.id]
            }
            yield result;
        }
    }
}

function currencies() {
    var seen = {};
    let sourceCurrencies = testTransfers
        .map(transfer => transfer.src_currency)
        .filter(item =>
            (seen.hasOwnProperty(item) ? false : (seen[item] = true)));
    let targetCurrencies = testTransfers
            .map(transfer => transfer.tgt_currency)
            .filter(item =>
                (seen.hasOwnProperty(item) ? false : (seen[item] = true)));
    return sourceCurrencies.concat(targetCurrencies);
}

function countries() {
    var seen = {};
    return recipients
        .map(recipient => recipient.country)
        .filter(item =>
            (seen.hasOwnProperty(item) ? false : (seen[item] = true)))
}

function getRecipientsById() {
    const result = {};
    recipients.forEach(recipient => {
        result[recipient.id] = recipient;
    });
    return result;
}

function getSendersById() {
    let result = {};
    senders.forEach(sender => {
        result[sender.id] = sender;
    });
    return result;
}

export { testStream, currencies, countries }