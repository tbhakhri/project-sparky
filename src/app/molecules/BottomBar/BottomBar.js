import PutRunSettings from '../PutRunSettings/PutRunSettings';
import BottomInputBox from '../BottomInputBox/BottomInputBox';
import './BottomBar.css';


export default function BottomBar() {
    return (
        <div className="bottom_bar_container"> 
            <div className="text_box_container">
                <BottomInputBox />
            </div>
            <div className="put_run_container">
                <PutRunSettings />
            </div>
        </div>
    
    );
}