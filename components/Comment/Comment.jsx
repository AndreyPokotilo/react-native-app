import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";

export const Comment = ({ comment }) => {
  const Data = new Date(comment.date);
  const Year = Data.getFullYear();
  const Month = Data.getMonth();
  const Day = Data.getDate();
  const Hour = String(Data.getHours()).padStart(2, '0');
  const Minutes = String(Data.getMinutes()).padStart(2, '0');

  let fMonth;
  // Преобразуем месяца
  switch (Month) {
    case 0:
     return fMonth = "января";
      break;
    case 1:
      fMonth = "февраля";
      break;
    case 2:
      fMonth = "марта";
      break;
    case 3:
      fMonth = "апреля";
      break;
    case 4:
      fMonth = "мае";
      break;
    case 5:
      fMonth = "июня";
      break;
    case 6:
      fMonth = "июля";
      break;
    case 7:
      fMonth = "августа";
      break;
    case 8:
      fMonth = "сентября";
      break;
    case 9:
      fMonth = "октября";
      break;
    case 10:
      fMonth = "ноября";
      break;
    case 11:
      fMonth = "декабря";
      break;
  }

  return (
    <View style={styles.commentItem}>
      <Image source={require("../../assets/comment-avatar-1.png")} />
      <View style={styles.comment}>
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text style={styles.commentDate}>
          {Day} {fMonth} {Year} | {Hour}:{Minutes}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentItem: { flexDirection: "row", marginBottom: 24, },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "rgba(189, 189, 189, 1)",
    textAlign: "right",
    marginTop: 8,
  },
  comment: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginLeft: 16,
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "rgba(33, 33, 33, 1)",
  },
});
