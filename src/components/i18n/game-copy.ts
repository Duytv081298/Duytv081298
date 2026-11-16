import type { Locale } from './locale';
import type { Game } from '@/data/games';

type CaseCopy = Pick<Game, 'subtitle' | 'description' | 'architecture' | 'challenges' | 'solutions'>;
const caseCopy: Record<string, { vi: CaseCopy; zh: CaseCopy }> = {
  'bloom-sort': {
    vi: {
      subtitle: 'Giải đố sắp xếp hoa thư giãn',
      description: 'Game giải đố sắp xếp hoa theo màu vào các lọ tương ứng. Kết hợp animation mượt mà, phản hồi xúc giác và các màn chơi có độ khó tăng dần.',
      architecture: 'Kiến trúc MVC với GameManager trung tâm, các module giao tiếp qua sự kiện. Sử dụng object pooling cho hoa và asset bundle cho từng gói màn chơi.',
      challenges: ['Kéo thả mượt mà với hiệu ứng đặt hoa dựa trên vật lý', 'Bộ nhớ tăng đột biến khi tải hơn 100 texture hoa', 'Bản quảng cáo chơi thử cần có dung lượng dưới 5 MB'],
      solutions: ['Hệ thống vật lý lò xo tùy chỉnh với độ giảm chấn và độ cứng có thể điều chỉnh', 'Gộp 100 texture vào 4 atlas và cắt sprite khi chạy', 'Nén tài nguyên: PNG sang WebP, âm thanh sang MP3 bitrate thấp và thu gọn mã nguồn'],
    },
    zh: {
      subtitle: '轻松的花朵分类益智游戏',
      description: '将花朵按颜色整理到对应花瓶中的益智游戏，提供流畅动画、触觉反馈和逐步提升的关卡难度。',
      architecture: '采用 MVC 架构和集中的 GameManager，模块间通过事件通信。花朵实例使用对象池，关卡包使用资源包。',
      challenges: ['实现流畅拖放和基于物理的落位动画', '加载超过 100 种花朵纹理时出现内存峰值', '试玩广告体积必须小于 5 MB'],
      solutions: ['自定义弹簧物理系统，可配置阻尼和刚度', '使用纹理图集和运行时精灵切分，将 100 张纹理合并为 4 张图集', '资源压缩流程：PNG 转 WebP、音频转低码率 MP3、代码压缩'],
    },
  },
  'screw-puzzle': {
    vi: {
      subtitle: 'Cơ chế tháo vít đầy cuốn hút',
      description: 'Game giải đố tháo vít và phân loại theo màu. Có hiệu ứng xoay dựa trên vật lý, độ khó tăng dần và animation hoàn thành tạo cảm giác thỏa mãn.',
      architecture: 'Kiến trúc dựa trên component Screw, Bolt và Board có thể tái sử dụng. Hệ thống xoay 2D tùy chỉnh được tối ưu cho thao tác cảm ứng trên di động.',
      challenges: ['Tạo cảm giác xoay vít tự nhiên trên thiết bị cảm ứng', 'Bố cục bảng phức tạp với các đường vít chồng chéo', 'Hiệu năng giảm khi có hơn 20 vít chuyển động trên thiết bị cấu hình thấp'],
      solutions: ['Ánh xạ thao tác chạm thành góc xoay với quán tính và ma sát', 'Phân vùng không gian để phát hiện va chạm giữa các đường vít', 'Hệ thống LOD đơn giản hóa animation cho vít ngoài màn hình hoặc ở xa'],
    },
    zh: {
      subtitle: '令人满足的拧螺丝玩法',
      description: '通过拧下螺丝并按颜色整理来解谜，提供真实的旋转物理、逐步提升的难度和富有成就感的完成动画。',
      architecture: '采用组件架构，复用 Screw、Bolt 和 Board 组件。自定义 2D 旋转系统针对移动触控进行优化。',
      challenges: ['在触控设备上实现真实的螺丝旋转手感', '处理螺丝路径交叠的复杂面板布局', '低端设备上超过 20 个螺丝动画导致性能下降'],
      solutions: ['将触控映射为旋转，并加入惯性和摩擦', '通过空间分区检测螺丝路径之间的碰撞', '使用 LOD 系统简化屏幕外或远处螺丝的动画'],
    },
  },
  'coffee-please': {
    vi: {
      subtitle: 'Mô phỏng pha chế và phục vụ cà phê',
      description: 'Game mô phỏng quán cà phê nhịp độ nhanh: pha chế, tùy chỉnh và phục vụ đồ uống cho khách hàng đang chờ. Kết hợp quản lý thời gian và giải đố.',
      architecture: 'Luồng game dựa trên máy trạng thái, kết hợp quản lý hàng chờ. Hệ thống sự kiện theo dõi đơn hàng và điểm số; module công thức giúp cập nhật nội dung dễ dàng.',
      challenges: ['Quản lý nhiều đơn hàng đồng thời mà không làm rối giao diện', 'Animation rót nước tự nhiên với mô phỏng chất lỏng', 'Giới hạn dung lượng quảng cáo chơi thử dưới 3 MB'],
      solutions: ['Hàng chờ cuộn được với chỉ báo ưu tiên và đếm ngược trực quan', 'Mô phỏng chất lỏng theo đường cong Bézier bằng biến dạng mesh', 'Tối ưu tài nguyên với texture tạo bằng thuật toán và material dùng chung'],
    },
    zh: {
      subtitle: '冲泡与服务咖啡店模拟',
      description: '快节奏咖啡店模拟游戏：冲泡、定制并为等待的顾客提供饮品，将时间管理与解谜玩法结合。',
      architecture: '使用状态机驱动流程并管理顾客队列，通过事件系统追踪订单和计分。模块化配方系统便于内容更新。',
      challenges: ['同时管理多笔订单且保持界面清晰', '实现动态液体物理的流畅倾倒动画', '试玩广告体积限制小于 3 MB'],
      solutions: ['使用可滚动队列、优先级提示和可视化倒计时', '基于 Bézier 曲线和网格变形模拟液体', '通过程序化纹理和共享材质深度优化资源'],
    },
  },
  'fall-guy-legend': {
    vi: {
      subtitle: 'Chạy đua vượt chướng ngại vật',
      description: 'Game vượt chướng ngại vật đầy màu sắc lấy cảm hứng từ các cuộc đua sinh tồn. Người chơi vượt qua bục xoay, búa đung đưa và dốc trơn để về đích.',
      architecture: 'Kiến trúc theo màn chơi với bố trí chướng ngại vật bằng thuật toán. Điều khiển nhân vật dựa trên vật lý, chuyển sang ragdoll khi bị loại.',
      challenges: ['Vật lý nhân vật mượt mà trên bục di chuyển và xoay', 'Chuyển tiếp ragdoll tự nhiên', 'Duy trì 60 FPS với animation chướng ngại vật phức tạp'],
      solutions: ['Bộ điều khiển nhân vật kinematic kế thừa vận tốc của bục', 'Tư thế ragdoll dựng sẵn kết hợp chuyển tiếp từ trạng thái animation', 'GPU instancing cho mesh lặp lại và loại bỏ phần tử ngoài màn hình'],
    },
    zh: {
      subtitle: '障碍赛跑游戏',
      description: '受生存竞速玩法启发的多彩障碍赛游戏。玩家穿越旋转平台、摆动锤子和湿滑斜坡，冲向终点。',
      architecture: '基于关卡的架构，使用程序化障碍布置。角色控制基于物理，淘汰时切换到布娃娃系统。',
      challenges: ['在移动和旋转平台上实现流畅角色物理', '实现自然的布娃娃过渡', '复杂障碍动画下保持 60 FPS'],
      solutions: ['使用可继承平台速度的运动学角色控制器', '将预先制作的布娃娃姿态与动画状态平滑混合', '对重复障碍网格使用 GPU 实例化，剔除屏幕外元素'],
    },
  },
  'tidy-master': {
    vi: {
      subtitle: 'Dọn dẹp và sắp xếp đầy thư giãn',
      description: 'Game dọn dẹp và sắp xếp đồ vật. Người chơi phân loại đồ đạc, làm sạch bề mặt và tổ chức không gian với thao tác kéo mượt mà và hiệu ứng hoàn thành mang âm hưởng ASMR.',
      architecture: 'Hệ thống đặt đồ vật theo lưới với cơ chế tự căn chỉnh, ngăn xếp hoàn tác/làm lại và hệ thống thành tích theo dõi tiến độ trực quan.',
      challenges: ['Đặt đồ vật tự nhiên khi căn chỉnh theo lưới', 'Hình dạng đồ vật đa dạng đòi hỏi tính toán lưới linh hoạt', 'Phản hồi hình ảnh và âm thanh tạo cảm giác thỏa mãn'],
      solutions: ['Căn chỉnh có trọng số với đường dẫn theo khoảng cách', 'Tính vùng chiếm chỗ trên lưới bằng đa giác cho hình dạng không đều', 'Kết hợp nhiều lớp hạt, rung màn hình và thay đổi cao độ âm thanh'],
    },
    zh: {
      subtitle: '轻松的整理与清洁玩法',
      description: '令人放松的清洁整理游戏。玩家分类物品、清洁表面并整理空间，体验流畅拖动操作和 ASMR 风格的完成反馈。',
      architecture: '采用网格放置与吸附机制，为玩家操作提供撤销/重做栈，并通过成就系统可视化追踪进度。',
      challenges: ['让网格吸附下的物品放置感觉自然', '为多种物品形状灵活计算网格', '构建令人满足的视听反馈系统'],
      solutions: ['使用加权网格吸附和基于距离的对齐参考线', '用多边形计算不规则物品的网格占用', '结合粒子层、屏幕震动和音频变调的反馈流程'],
    },
  },
  'cat-stack': {
    vi: {
      subtitle: 'Xếp những chú mèo đáng yêu thật cao',
      description: 'Game xếp chồng những chú mèo đáng yêu, kết hợp thao tác một chạm đơn giản với cân bằng vật lý và thiết kế nhân vật dễ thương.',
      architecture: 'Vòng lặp game đơn giản với cơ chế xếp chồng dựa trên vật lý. Tích hợp Spine cho nhân vật mèo, theo dõi điểm và bảng xếp hạng cục bộ.',
      challenges: ['Vật lý xếp chồng chính xác và công bằng với người chơi', 'Đồng bộ animation Spine với vật thể vật lý', 'Tích hợp Facebook Playable API'],
      solutions: ['Material vật lý tùy chỉnh với ma sát cao và độ nảy phù hợp', 'Cập nhật hình dạng vật thể vật lý theo từng khung hình animation', 'Lớp trừu tượng nền tảng để triển khai đa nền tảng'],
    },
    zh: {
      subtitle: '将可爱的猫咪叠得更高',
      description: '通过简单的一键操作将可爱的猫咪相互叠放，结合基于物理的平衡玩法与可爱角色设计。',
      architecture: '使用基于物理堆叠的简单游戏循环。集成 Spine 猫咪动画，支持计分和本地排行榜。',
      challenges: ['实现精确且公平的堆叠物理', '让 Spine 动画与物理刚体同步', '集成 Facebook Playable API'],
      solutions: ['使用高摩擦系数及调整恢复系数的自定义物理材质', '根据动画逐帧更新物理刚体形状', '抽象平台层以支持跨平台部署'],
    },
  },
};

export function localizeGame(game: Game, locale: Locale): Game {
  return locale === 'en' ? game : { ...game, ...caseCopy[game.slug]?.[locale] };
}
