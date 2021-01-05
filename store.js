import {combineReducers} from 'redux';
import AppReducer from './src/Containers/App/reducer';
import LoginReducer from './src/Containers/Login/reducer';
import ForgotPasswordReducer from './src/Containers/ForgotPassword/reducer';
import NewPasswordReducer from './src/Containers/NewPassword/reducer';
import DashboardReducer from './src/Containers/Dashboard/reducer';
import TransactionDetailReducer from './src/Containers/TransactionDetail/reducer';

const appReducer = combineReducers({
  appState: AppReducer,
  loginState: LoginReducer,
  forgotState: ForgotPasswordReducer,
  newPasswordState: NewPasswordReducer,
  dashboardState: DashboardReducer,
  TransactionState: TransactionDetailReducer,
});
export default appReducer;
