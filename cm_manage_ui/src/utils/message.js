import {Message} from 'element-ui';

export function notice(type, message) {
    console.log(type)
switch (type) {
    case "info":Message.info(message);
    break;
    case "error": Message.error(message);
    break;
    case "success": Message.success(message)
    break;
    case "warning": Message.warning(message)
}
}

export default notice