import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faLeftLong, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

library.add(
        faLeftLong,
        faHeart,
        faPaperPlane
    )

export default ['font-awesome', FontAwesomeIcon]