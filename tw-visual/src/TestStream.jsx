import testTransfers from './sample_data/transfers.json'

export default function* testStream() {
    while (true) {
        for (var element in testTransfers) {
            console.log(testTransfers[element]);
            yield testTransfers[element];
        }
    }
}