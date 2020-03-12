import Vue from 'vue';
import {
    Button,
    NavBar,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    TreeSelect,
    Grid,
    GridItem,
    Card,
    Toast
} from 'vant';

import 'vant/lib/index.css';

Vue
    .use(Button)
    .use(NavBar)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Swipe)
    .use(SwipeItem)
    .use(TreeSelect)
    .use(Grid)
    .use(GridItem)
    .use(Card)
    .use(Toast);