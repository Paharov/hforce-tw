import testTransfers from './sample_data/transfers.json'
import recipients from './sample_data/recipient.json'
import senders from './sample_data/profile-service.json'

export default function* testStream() {
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

function getRecipientsById() {
    const result = {};
    recipients.forEach(recipient => {
        result[recipient.id] = recipient;
    });
    return result;
}

function getSendersById(){
    let result= {};
    senders.forEach(sender => {
        result[sender.id] = sender;
    });
    return result;
}

