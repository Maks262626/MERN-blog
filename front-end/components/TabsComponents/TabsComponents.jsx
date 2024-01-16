import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import s from './TabsComponents.module.scss';
import { useState } from "react";
import Article from "../Article/Article";
import ArticleSkeleton from "../Article/ArticleSkeleton";

function TabsComponent({ tablist, tabPanel,status}) {
    
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className={s.tabList}>
                {tablist.map((t, index) => {
                    return <Tab key={index}>{t}</Tab>;
                })}
            </TabList>
            {tabPanel.map((panel, tabIdx) => {
                return (
                    <TabPanel className={s.tabPanel} key={tabIdx}>
                        {status === "loading" ? (
                            <ArticleSkeleton />
                        ) : (
                            panel.map((arcticle, articleIdx) => {
                                return (
                                    <Article
                                        article={arcticle}
                                        key={articleIdx}
                                    />
                                );
                            })
                        )}
                    </TabPanel>
                );
            })}
        </Tabs>
    );
}

export default TabsComponent;