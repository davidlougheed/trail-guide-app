import PagerView from "react-native-pager-view";

const PagerViewNative = ({ children, ...props }) => (
    <PagerView {...props}>{children}</PagerView>
);

export default PagerViewNative;
