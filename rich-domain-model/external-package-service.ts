export class ExternalPackageSystem {
    prepareOrder() {

    }

    executeOrder() {
        console.log(`(lets deliver) ordered`)
    }

    status(): string {
        console.log(`(lets deliver) checking status`)
        return `done`
    }

    markAsDelivered() {

    }
}
