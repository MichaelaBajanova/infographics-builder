import {combineReducers} from 'redux'
import authReducer from 'ducks/auth/authReducer'
import boardReducer from 'ducks/board/boardReducer'
import builderReducer from 'ducks/builder/builderReducer'
import sharedPreviewReducer from 'ducks/shared-preview/sharedPreviewReducer'

export default combineReducers({
    auth: authReducer,
    board: boardReducer,
    builder: builderReducer,
    preview: sharedPreviewReducer,
})
