import testTransfers from './sample_data/transfers.json'
import recipients from './sample_data/recipient.json'
import senders from './sample_data/profile-service.json'

function* testStream(currencies) {
    const recipientsById = getRecipientsById();
    const sendersById = getSendersById();
    while (true) {
        for (var element in testTransfers) {
            var transfer = testTransfers[element];
            if (currencies.indexOf(transfer.src_currency) == -1 || 
                currencies.indexOf(transfer.tgt_currency) == -1) {
                    continue;
            }
            var result = {
                ...transfer,
                recipient: recipientsById[transfer.recipient_id],
                sender: sendersById[transfer.id]
            }
            yield result;
        }
    }
}

function currencies(numTop) {
    var seen = {};
    let sourceCurrencies = testTransfers
        .map(transfer => transfer.src_currency)
        .filter(item =>
            (seen.hasOwnProperty(item) ? seen[item] = seen[item]++ : (seen[item] = 1)));
    let targetCurrencies = testTransfers
            .map(transfer => transfer.tgt_currency)
            .filter(item =>
                (seen.hasOwnProperty(item) ? seen[item]++ : (seen[item] = 1)));
    return Object.keys(seen).sort( (a, b) => seen[b] - seen[a]).slice(0, numTop);
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