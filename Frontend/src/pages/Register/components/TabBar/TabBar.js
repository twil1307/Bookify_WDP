import tabBarStyles from "./TabBar.module.scss";
import { memo } from 'react';

const TabButton = memo(({ id, isActive, handleClick }) => {

    return (
        <button 
            className={[
                tabBarStyles["tab-button"],
                isActive ? tabBarStyles["active"] : ''
            ].join(' ')} 
            onClick={() => { handleClick(id) }}
        />
    )
})

function TabBar({ inputTabIndex, handleChangeTab, tabIdList }) {
    return (
        <div id={tabBarStyles["register-tab-bar"]}>
            <div className={tabBarStyles["tab-button-list"]}>
                {tabIdList.map((id) => (
                    <TabButton 
                        key={id}
                        id={id} 
                        isActive={inputTabIndex === id} 
                        handleClick={handleChangeTab}
                    />
                ))}
            </div>
        </div>
    );
}

export default TabBar;
