
// usage is pretty clear
import {RichPackage, Size, Type, Variant} from "./rich-package";

const pkg = RichPackage.register(new Type('box'), new Size('medium'), new Variant('shrug'))

// if success (Maybe<>), then we have it already stored & submitted
console.log(pkg.status())
