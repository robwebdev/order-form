import { StyleSheet } from "react-native";

const COLOR_1 = "rgba(61, 70, 77, 1)";
const COLOR_2 = "rgba(128, 128, 128, 1))";
const COLOR_3 = "rgba(174, 178, 191, 0.4)";
const COLOR_4 = "rgba(152, 166, 173, 0.5)";
const COLOR_5 = "rgba(174, 178, 191, 0.3)";

const BaseStyles = {
  text: {},
  input: {
    borderColor: COLOR_4,
    borderStyle: "solid",
    borderWidth: 2,
    color: COLOR_2,
    height: 36,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4
  }
};

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    backgroundColor: COLOR_1,
    color: "white",
    textAlign: "center",
    padding: 10,
    paddingTop: 25
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_5
  },
  formContainer: {
    justifyContent: "flex-start",
    paddingVertical: 40
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  headerField: {
    justifyContent: "flex-start",
    marginBottom: 15,
    paddingHorizontal: 20
  },
  input: {
    ...BaseStyles.input,
    marginTop: 5
  },
  label: {
    ...BaseStyles.text
  },
  error: {
    color: "red",
    marginTop: 10
  },
  columnInput: {
    ...BaseStyles.input,
    marginTop: 5
  },
  itemOdd: {
    backgroundColor: COLOR_5,
    padding: 20
  },
  itemEven: {
    padding: 20
  },
  itemRow: {
    justifyContent: "flex-start",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap"
  },
  itemColumn: {
    marginRight: 10,
    flex: 1,
    justifyContent: "space-between"
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerLabel: {
    paddingHorizontal: 10
  },
  footerInput: {
    width: 60,
    flex: 0,
    marginTop: 0,
    marginRight: 10
  }
});
