import {Guid, RichPackage} from "./rich-package";

class WebHookService {
    listen() {
        setTimeout(() => {
            const incomingPackageUUid = 'aaa-ccc'

            // Aggregate Root from persisted state in our db
            const pkg = RichPackage.load(new Guid(incomingPackageUUid))

            // update state, manually or via polling again
            if (pkg.status().isFinished()) {
                // non-package-related events may be created, like send email probably?
            }
        }, 1000)
    }
}

const k = new WebHookService()

k.listen()
