import { AppData } from './types';

const getImageUrl = (filename: string) => {
  return `./pic/${filename}`;
};

export const appData: AppData = {
  title: "회장님의 위인전",
  synopsis: "경영난을 겪고 있는 도서출판 말미잘에\n전화 한 통이 걸려온다.\n해삼그룹 장해삼 회장이 막대한 선금을\n약속하며 본인의 위인전을 만들어 달라는데...\n\n도저히 본받을 곳이라곤 없는 회장님의\n위인전, 과연 완성될 수 있을까..?",
  specialThanks: [
    "50기 이지완 선배님",
    "52기 장요훈 선배님",
    "55기 조영진 선배님",
    "57기 이창기 선배님",
    "57기 이현우 선배님",
    "59기 김서연 선배님",
    "63기 이재홍",
    "63기 장선웅",
    "63기 장연희",
    "64기 손현빈",
    "64기 김현승",
    "66기 최지유"
  ],
  schedule: [
    { round: "1회차", date: "3월 5일(목)", time: "19시 30분" },
    { round: "2회차", date: "3월 6일(금)", time: "19시 30분" },
    { round: "3회차", date: "3월 7일(토)", time: "14시" },
    { round: "4회차", date: "3월 7일(토)", time: "19시" },
    { round: "5회차", date: "3월 8일(일)", time: "16시" }
  ],
  shelves: [
    {
      id: "section-character",
      categoryEnglish: "Character",
      categoryKorean: "등장인물",
      groupPhotoUrl: getImageUrl("Cast.jpg"),
      books: [
        { id: "Char_1", title: "스물한 살의 나에게", author: "정준원", color: "bg-white", characterRole: "사장", roleDescription: "도서출판 말미잘의 사장", imageUrl: getImageUrl("Char_1.jpg"), cohort: "61기", department: "영상", studentId: "20" },
        { id: "Char_2", title: "말미잘에서 살아남기", author: "김희원", color: "bg-white", characterRole: "김지현", roleDescription: "말미잘 1호 사원이자 이사원과 함께 고참 멤버 중 하나", imageUrl: getImageUrl("Char_2.jpg"), cohort: "66기", department: "경제", studentId: "24" },
        { id: "Char_3", title: "과잉 생각 방지 안내서 - 번뇌 탈출", author: "진태훈", color: "bg-white", characterRole: "이선호", roleDescription: "말미잘 2호 사원, 직책은 일단 디자이너이다", imageUrl: getImageUrl("Char_3.jpg"), cohort: "66기", department: "경영", studentId: "21" },
        { id: "Char_4", title: "그럼에도 불구하고, ( )", author: "권민재", color: "bg-white", characterRole: "박수영", roleDescription: "몇년 만에 막내를 탈출했다 엉뚱하긴 해도 열정은 뒤지지 않는다", imageUrl: getImageUrl("Char_4.jpg"), cohort: "66기", department: "미컴", studentId: "25" },
        { id: "Char_5", title: "집", author: "윤호준", color: "bg-white", characterRole: "송지석", roleDescription: "모든 세대가 읽는 책을 만들고 싶은 패기있는 신입", imageUrl: getImageUrl("Char_5.jpg"), cohort: "66기", department: "글경", studentId: "22" },
        { id: "Char_6", title: "어쩌다 이렇게 됐지", author: "김성겸", color: "bg-white", characterRole: "장해삼", roleDescription: "굴지의 글로벌 기업 해삼그룹의 신화를 일군 장본인", imageUrl: getImageUrl("Char_6.jpg"), cohort: "65기", department: "신소재", studentId: "23" },
        { id: "Char_7", title: "탈각", author: "이사라", color: "bg-white", characterRole: "강혜진", roleDescription: "해삼그룹 회장 부속실 소속 비서", imageUrl: getImageUrl("Char_7.jpg"), cohort: "66기", department: "미컴", studentId: "25" },
      ]
    },
    {
      id: "section-director",
      categoryEnglish: "DIRECTOR",
      categoryKorean: "연출",
      defaultIcon: "pen",
      monologues: [
        {
          title: "연출의 말",
          content: "돈을 좇아 악인을 위인으로 탈바꿈시키는 사원들의 이야기입니다. 안위와 신념, 흔한 선택지입니다. 최근에 스스로 크고 작은 갈림길에 놓이게 되었고, 그마다 여러 선택을 밟았습니다. 후회와 합리화가 끝나기도 전 다시 또다른 선택이 목전입니다.\n선택의 책임을 개인이 오롯이 감당하지 않아도 된다면 유혹은 한결 강해집니다. 조직의 논리에 편승해 잘못된 결정을 따르는 사례를 우리는 너무도 많이 목격했습니다. 대체 왜 저러는 걸까요? 그 이유를 사실은 알고 있어서 고민이 이어집니다.\n\n고민들 사이에서 연극을 만듭니다. 연출이 되면 저의 삶을 관통하는 질문을 던지고 싶었는데, 당장 눈앞의 결정도 도망치고 싶은 제겐 이른 것 같습니다. 그래서 지금의 저를 헝클어 놓는 일에 대해 이야기해 보기로 합니다. 어쩌면 공연을 만든다며 춤추듯 잠자듯 회피하고 있는 것일지도 모르겠습니다.\n소중한 사람들과 즐겁게 만들었습니다. 부족한 저를 믿고 함께해준 모든 공연진께 진심으로 감사드립니다. 극장을 찾아주신 관객 여러분의 곁에 용기와 웃음이 있길 빕니다."
        },
        {
          title: "조연출의 말",
          content: "안녕하세요, 조연출 하선영입니다. 성균극회의 130회 대공연에 함께해주셔서 감사합니다. 여러분이 어떤 연유로 무대와 만나게 되셨을지는 모르겠지만, 사실 저에게는 연극이란 게 조금 별나고 낯간지러운 의미를 가집니다. 연극은 지금까지 저를 몇 번이나 구원해주었거든요. 삶이 힘들어 침전되던 저를 연극이 매번 멱살 잡고 수면 위로 건져 올렸습니다. 무엇보다 연극은 항상 사람, 사람, 사람 이야기로 가득 차 있습니다. 그래서 저는 삶을 놓칠래야 놓칠 수가 없게 됩니다.\n\n이번 공연도 역시나 절 자꾸만 살아있게 했습니다. 그리고 이런 질문을 놓칠래야 놓칠 수 없게 합니다-세상에 낭자한 위인전에 휘둘리지 않으려면, 우리는 어떻게 해야 할까요? 공연을 보면서 잔뜩 생각해주세요! 어느 철학자가 말한 것처럼, 우리는 생각하고 고로 존재하니까요. 저희 연극이 여러분을 살아있게 했으면 좋겠습니다."
        }
      ],
      books: [
        { id: "Dir_1", title: "제130회 대공연 프로그램북", author: "김동건", color: "bg-black", textColor: "text-white", isLeader: true, imageUrl: getImageUrl("Dir_1.jpg"), cohort: "61기", department: "소프트", studentId: "20" },
        { id: "Dir_2", title: "그게 내가 되지 말란 법은 없잖아", author: "하선영", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Dir_2.jpg"), cohort: "66기", department: "영문", studentId: "24" }
      ]
    },
    {
      id: "section-planning-leader",
      categoryEnglish: "PRODUCER",
      categoryKorean: "기획팀장",
      defaultIcon: "briefcase",
      monologues: [
        {
          title: "기획의 말",
          content: "매년 살을 에는 추위를 몰고 오던 겨울의 바람이 가고 새로운 출발을 의미하는 따뜻한 봄이 왔습니다.\n성균극회 동아리 창단 80주년과 함께 제 130회 정기대공연이 그 출발을 여러분과 함께 맞이하고자 합니다.\n\n연극에 큰 관심이 없던 저는 우연히 성균극회 65기로 입회하여 5번의 공연을 함께 하였습니다.\n저는 매 공연마다 생각했습니다. 이 사람들은 왜 아무런 보상이 없는 극을 위해 이토록 노력하는가?\n왜 사람들은 연극을 사랑하며 이를 올리기 위해 열심히 노력하는가? 관객은 왜 이를 보기 위해 극장을 찾는가?\n\n이번에 기획팀장을 맡고 그 답을 찾기 위해 분주히 보낸 이번 겨울, 저는 드디어 어렴풋한 해답을 만났습니다. 그것은 바로 '찰나의 진심'이었습니다.\n아무런 보상이 없기에 우리는 더욱 순수하게 서로의 눈을 맞출 수 있었고, 보이지 않는 곳에서의 수많은 땀방울은 오직 무대 위에서 피어날 단 한 번의 찬란한 순간을 향해 있었습니다.\n\n80년이라는 긴 시간 동안 성균극회가 쉼 없이 달려올 수 있었던 동력 또한, 이 무모하리만큼 뜨거운 진심들이 겹겹이 쌓여온 덕분일 것입니다.\n누군가에게는 그저 스쳐 지나가는 시간일지 모르나, 저희에게는 한 조각을 멋있게 장식할 소중한 기억입니다.\n\n이제 그 뜨거웠던 겨울의 기록을 여러분 앞에 펼쳐 보이려 합니다. 차가운 공기를 뚫고 피어난 봄꽃처럼, 저희의 무대가 여러분의 마음속에 작은 즐거움이 되기를 소망합니다."
        }
      ],
      books: [
        { id: "Prod_1", title: "세상에 나쁜 경험은 없다.", author: "김윤형", color: "bg-neutral-800", textColor: "text-white", isLeader: true, imageUrl: getImageUrl("Prod_1.jpg"), cohort: "65기", department: "전전", studentId: "24" }
      ]
    },
    {
      id: "section-planning",
      categoryEnglish: "PRODUCTION",
      categoryKorean: "기획",
      defaultIcon: "briefcase",
      books: [
        { id: "Prod_2", title: "김민서짱", author: "김민서", color: "bg-neutral-100", textColor: "text-black", imageUrl: getImageUrl("Prod_2.jpg"), cohort: "65기", department: "미술", studentId: "24" },
        { id: "Prod_3", title: "누가 내 머리에 똥쌌을까", author: "엄현식", color: "bg-neutral-300", textColor: "text-black", imageUrl: getImageUrl("Prod_3.jpg"), cohort: "62기", department: "신소재", studentId: "21" },
        { id: "Prod_4", title: "쓸모없는 지식사전", author: "이수빈", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Prod_4.jpg"), cohort: "66기", department: "글경", studentId: "24" },
        { id: "Prod_5", title: "흔들림의 미학", author: "지서현", color: "bg-neutral-900", textColor: "text-white", imageUrl: getImageUrl("Prod_5.jpg"), cohort: "66기", department: "글경", studentId: "24" },
        { id: "Prod_6", title: "때수건에 대하여", author: "최유은", color: "bg-neutral-200", textColor: "text-black", imageUrl: getImageUrl("Prod_6.jpg"), cohort: "66기", department: "건환공", studentId: "25" }
      ]
    },
    {
      id: "section-stage",
      categoryEnglish: "STAGE",
      categoryKorean: "무대",
      defaultIcon: "hammer",
      books: [
        { id: "Stage_1", title: "나의 사랑하는 책 비록 헤어졌으나", author: "김예나", color: "bg-black", textColor: "text-white", isLeader: true, imageUrl: getImageUrl("Stage_1.jpg"), cohort: "66기", department: "건축", studentId: "24" },
        { id: "Stage_2", title: "내일은 스트레스 안 받을 거야", author: "김기현", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Stage_2.jpg"), cohort: "66기", department: "한문", studentId: "24" },
        { id: "Stage_3", title: "줴줴이야", author: "김효성", color: "bg-neutral-400", textColor: "text-black", imageUrl: getImageUrl("Stage_3.jpg"), cohort: "64기", department: "경영", studentId: "23" },
        { id: "Stage_4", title: "2026년 전의 너로부터", author: "박영재", color: "bg-neutral-800", textColor: "text-white", imageUrl: getImageUrl("Stage_4.jpg"), cohort: "66기", department: "생과", studentId: "25" },
        { id: "Stage_5", title: "도토리삼형제", author: "박자연", color: "bg-neutral-100", textColor: "text-black", imageUrl: getImageUrl("Stage_5.jpg"), cohort: "66기", department: "인융", studentId: "25" },
        { id: "Stage_6", title: "낡은이의 하루 철학", author: "이지원", color: "bg-neutral-900", textColor: "text-white", imageUrl: getImageUrl("Stage_6.jpg"), cohort: "66기", department: "글바메", studentId: "25" },
        { id: "Stage_7", title: "잠 잘 오게 이불 덮는 99가지 방법", author: "조아정", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Stage_7.jpg"), cohort: "65기", department: "지솦", studentId: "24" },
        { id: "Stage_8", title: "자고싶다", author: "차민규", color: "bg-neutral-600", textColor: "text-white", imageUrl: getImageUrl("Stage_8.jpg"), cohort: "65기", department: "경제", studentId: "24" }
      ]
    },
    {
      id: "section-lighting",
      categoryEnglish: "LIGHTING",
      categoryKorean: "조명",
      defaultIcon: "lightbulb",
      books: [
        { id: "Light_1", title: "집에 가는 549가지 방법", author: "이재욱", color: "bg-neutral-200", textColor: "text-black", isLeader: true, imageUrl: getImageUrl("Light_1.jpg"), cohort: "63기", department: "바메", studentId: "22" },
        { id: "Light_2", title: "If 그랬더라면", author: "강민성", color: "bg-black", textColor: "text-white", imageUrl: getImageUrl("Light_2.jpg"), cohort: "65기", department: "전전", studentId: "21" },
        { id: "Light_3", title: "행복", author: "권종구", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Light_3.jpg"), cohort: "66기", department: "영상", studentId: "25" },
        { id: "Light_4", title: "김나현의 위인전", author: "김나현", color: "bg-neutral-500", textColor: "text-white", imageUrl: getImageUrl("Light_4.jpg"), cohort: "66기", department: "화공", studentId: "25" },
        { id: "Light_5", title: "인간은 왜", author: "김예은", color: "bg-neutral-800", textColor: "text-white", imageUrl: getImageUrl("Light_5.jpg"), cohort: "65기", department: "사회", studentId: "24" },
        { id: "Light_6", title: "맛있게 먹는 방법", author: "이재준", color: "bg-neutral-100", textColor: "text-black", imageUrl: getImageUrl("Light_6.jpg"), cohort: "66기", department: "전전", studentId: "25" },
        { id: "Light_7", title: "이채원", author: "이채원", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Light_7.jpg"), cohort: "66기", department: "국문", studentId: "25" },
        { id: "Light_8", title: "줏대 있게 살아가는 법", author: "임지수", color: "bg-black", textColor: "text-white", imageUrl: getImageUrl("Light_8.jpg"), cohort: "66기", department: "영상", studentId: "25" }
      ]
    },
    {
      id: "section-sound",
      categoryEnglish: "SOUND",
      categoryKorean: "음향",
      defaultIcon: "music",
      books: [
        { id: "Sound_1", title: "처음처럼", author: "정우혁", color: "bg-neutral-300", textColor: "text-black", isLeader: true, imageUrl: getImageUrl("Sound_1.jpg"), cohort: "66기", department: "시경", studentId: "25" },
        { id: "Sound_2", title: "인생은 웍질", author: "김경원", color: "bg-neutral-900", textColor: "text-white", imageUrl: getImageUrl("Sound_2.jpg"), cohort: "66기", department: "양정공", studentId: "25" },
        { id: "Sound_3", title: "현대인이 고양이를 키워야하는 이유", author: "이수민", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Sound_3.jpg"), cohort: "66기", department: "전전", studentId: "25" },
        { id: "Sound_4", title: "두산은 어떻게 강팀이 되었는가,", author: "이승주", color: "bg-neutral-700", textColor: "text-white", imageUrl: getImageUrl("Sound_4.jpg"), cohort: "66기", department: "사학", studentId: "24" },
        { id: "Sound_5", title: "목포 촌놈의 서울상경기", author: "정세현", color: "bg-neutral-100", textColor: "text-black", imageUrl: getImageUrl("Sound_5.jpg"), cohort: "65기", department: "심리", studentId: "24" },
        { id: "Sound_6", title: "백지 도화지 위 너라는 낭만", author: "조준범", color: "bg-black", textColor: "text-white", imageUrl: getImageUrl("Sound_6.jpg"), cohort: "65기", department: "인융", studentId: "22" },
        { id: "Sound_7", title: "몰라 네가 정해봐... ㅠㅠ", author: "최아야", color: "bg-neutral-400", textColor: "text-black", imageUrl: getImageUrl("Sound_7.jpg"), cohort: "64기", department: "의학", studentId: "23" }
      ]
    },
    {
      id: "section-costume",
      categoryEnglish: "COSTUME∙PROPS∙MAKEUP",
      categoryKorean: "의상∙소품∙분장",
      defaultIcon: "scissors",
      books: [
        { id: "Costume_1", title: "노력 없이 부자 되는법", author: "정새연", color: "bg-white", textColor: "text-black", isLeader: true, imageUrl: getImageUrl("Costume_1.jpg"), cohort: "65기", department: "경제", studentId: "24" },
        { id: "Costume_2", title: "진리의 힘은 거짓보다 강하다", author: "김명옥", color: "bg-neutral-900", textColor: "text-white", imageUrl: getImageUrl("Costume_2.jpg"), cohort: "65기", department: "미컴", studentId: "24" },
        { id: "Costume_3", title: "이 책을 펴면 미래로 감", author: "김유경", color: "bg-neutral-200", textColor: "text-black", imageUrl: getImageUrl("Costume_3.jpg"), cohort: "64기", department: "행정", studentId: "23" },
        { id: "Costume_4", title: "널 사랑할 수밖에 없는 이유.", author: "이은교", color: "bg-black", textColor: "text-white", imageUrl: getImageUrl("Costume_4.jpg"), cohort: "66기", department: "무용", studentId: "24" },
        { id: "Costume_5", title: "피할 수 없을때 즐기는 법 24가지", author: "조윤영", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Costume_5.jpg"), cohort: "66기", department: "생과", studentId: "25" }
      ]
    },
    {
      id: "section-cast",
      categoryEnglish: "CAST",
      categoryKorean: "캐스트",
      books: [
        { id: "Cast_1", title: "스물한 살의 나에게", author: "정준원", color: "bg-black", textColor: "text-white", imageUrl: getImageUrl("Char_1.jpg"), cohort: "61기", department: "영상", studentId: "20" },
        { id: "Cast_2", title: "말미잘에서 살아남기", author: "김희원", color: "bg-white", textColor: "text-black", imageUrl: getImageUrl("Char_2.jpg"), cohort: "66기", department: "경제", studentId: "24" },
        { id: "Cast_3", title: "과잉 생각 방지 안내서 - 번뇌 탈출", author: "진태훈", color: "bg-neutral-800", textColor: "text-white", imageUrl: getImageUrl("Char_3.jpg"), cohort: "66기", department: "경영", studentId: "21" },
        { id: "Cast_4", title: "그럼에도 불구하고, ( )", author: "권민재", color: "bg-neutral-100", textColor: "text-black", imageUrl: getImageUrl("Char_4.jpg"), cohort: "66기", department: "미컴", studentId: "25" },
        { id: "Cast_5", title: "집", author: "윤호준", color: "bg-neutral-300", textColor: "text-black", imageUrl: getImageUrl("Char_5.jpg"), cohort: "66기", department: "글경", studentId: "22" },
        { id: "Cast_6", title: "어쩌다 이렇게 됐지", author: "김성겸", color: "bg-neutral-900", textColor: "text-white", imageUrl: getImageUrl("Char_6.jpg"), cohort: "65기", department: "신소재", studentId: "23" },
        { id: "Cast_7", title: "탈각", author: "이사라", color: "bg-neutral-500", textColor: "text-white", imageUrl: getImageUrl("Char_7.jpg"), cohort: "66기", department: "미컴", studentId: "25" },
      ]
    }
  ]
};
