package cn.itscloudy.bdx.mapper.provider;

public class CreateProvider {
    public String grp() {
        return "CREATE TABLE IF NOT EXISTS `grp` (" + "  `ID` int(11) NOT NULL AUTO_INCREMENT," + "  `NAME` varchar(255) DEFAULT NULL," + "  `DIRECTION` varchar(255) DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

    public String member() {
        return "CREATE TABLE IF NOT EXISTS `member` (" + "  `ID` varchar(11) NOT NULL," + "  `GRP_ID` int(11) DEFAULT NULL," + "  `NAME` varchar(255) DEFAULT NULL," + "  `PASSWORD` varchar(255) DEFAULT NULL," + "  `tel` varchar(11) DEFAULT NULL," + "  `email` varchar(255) DEFAULT NULL," + "  `JOIN_DATE` date DEFAULT NULL," + "  `QUIT_DATE` date DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

    public String charger() {
        return "CREATE TABLE IF NOT EXISTS `charger` (" + "  `ID` varchar(11) NOT NULL," + "  `LEVEL` int(11) DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

    public String sign() {
        return "CREATE TABLE IF NOT EXISTS `sign` (" + "  `ID` int(11) NOT NULL AUTO_INCREMENT," + "  `DATE` date DEFAULT NULL," + "  `TIME` time DEFAULT NULL," + "  `ISCHECKIN` int(2) DEFAULT NULL," + "  `MEMBER_ID` varchar(11) DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ") ";
    }

    public String news() {
        return "CREATE TABLE IF NOT EXISTS `news` (" + "  `ID` int(11) NOT NULL AUTO_INCREMENT," + "  `AUTHOR` varchar(255) DEFAULT NULL," + "  `TITLE` varchar(255) DEFAULT NULL," + "  `CONTENT` longtext," + "  `DATE` datetime DEFAULT NULL," + "  `ABOUT` varchar(255) DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

    public String member_message() {
        return "CREATE TABLE IF NOT EXISTS `membermessage` (" + "  `ID` int(11) NOT NULL AUTO_INCREMENT," + "  `MEMBER_ID` varchar(11) DEFAULT NULL," + "  `MESSAGE` longtext," + "  `Date` datetime DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

    public String visitor_message() {
        return "CREATE TABLE IF NOT EXISTS `visitormessage` (" + "  `ID` int(11) NOT NULL AUTO_INCREMENT," + "  `NAME` varchar(255) DEFAULT NULL," + "  `QQ` varchar(255) DEFAULT NULL," + "  `TEL` varchar(255) DEFAULT NULL," + "  `EMAIL` varchar(255) DEFAULT NULL," + "  `MESSAGE` longtext," + "  `DATE` datetime DEFAULT NULL," + "  PRIMARY KEY (`ID`)" + ")";
    }

}
