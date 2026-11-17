import type { Locale } from './locale';
import type { Game } from '@/data/games';

type CaseCopy = Pick<Game, 'subtitle' | 'description' | 'architecture' | 'challenges' | 'solutions'>;
const caseCopy: Record<string, { vi: CaseCopy; zh: CaseCopy }> = {
  "bloom-sort": {
  "vi": {
    "subtitle": "Giải đố sắp xếp hoa thư giãn",
    "description": "Demo sắp xếp hoa theo màu để hoàn thành bàn chơi. Phân tích thiết kế tập trung vào phản hồi thao tác và tái sử dụng hiệu ứng.",
    "architecture": "Tách dữ liệu bàn chơi, thao tác chạm và phản hồi hình ảnh. Kiểm tra nước đi trước khi cập nhật mô hình; phát sự kiện animation và hoàn thành. Giới hạn pool hiệu ứng và giải phóng tài nguyên màn khi chơi lại.",
    "challenges": [
      "Kéo thả nhanh nhưng ngăn nước đi không hợp lệ",
      "Kiểm soát texture và cấp phát qua nhiều lần chơi lại",
      "Cân bằng hình ảnh với giới hạn dung lượng từng mạng quảng cáo"
    ],
    "solutions": [
      "Kiểm tra nước đi trước khi chạy animation",
      "Gộp sprite tương thích và giới hạn pool hiệu ứng",
      "Kiểm tra texture, âm thanh và mã nhúng trước khi chọn cách nén"
    ]
  },
  "zh": {
    "subtitle": "轻松的花朵分类益智游戏",
    "description": "按颜色分组花朵以完成棋盘的试玩。本设计分析重点关注及时输入反馈和视觉特效复用。",
    "architecture": "分离棋盘数据、触控输入与视觉反馈。先验证移动再更新模型，通过事件触发动画与完成。限制特效池大小，并在重启时释放关卡资源。",
    "challenges": [
      "及时拖动反馈且阻止无效移动",
      "控制多次重启中的纹理驻留与内存分配",
      "在各平台包体限制内保留视觉多样性"
    ],
    "solutions": [
      "验证移动后再播放动画",
      "合并兼容精灵并限制可复用特效池",
      "分别检查纹理、音频和嵌入代码后选择压缩方式"
    ]
  }
},
  "screw-puzzle": {
  "vi": {
    "subtitle": "Cơ chế tháo vít đầy cuốn hút",
    "description": "Demo tháo thanh gỗ bằng cách chuyển vít vào lỗ trống hợp lệ. Phân tích tập trung vào kiểm tra nước đi và đồng bộ phản hồi hình ảnh.",
    "architecture": "Biểu diễn lỗ, vít và quan hệ phụ thuộc của thanh gỗ bằng dữ liệu. Cập nhật mô hình như một giao dịch sau khi kiểm tra; lớp hiển thị riêng chạy animation. Quản lý rõ trạng thái chơi lại và hoàn thành.",
    "challenges": [
      "Chạm liên tục áp dụng cùng nước đi hai lần",
      "Lỗ bị chặn và thanh gỗ chồng chéo",
      "Animation lệch trạng thái logic sau gián đoạn"
    ],
    "solutions": [
      "Khóa nước đi đang thực hiện đến khi ghi nhận trạng thái xong",
      "Kiểm tra vị trí trống và quan hệ phụ thuộc trước animation",
      "Đặt lại cả lớp logic và hình ảnh cùng lúc"
    ]
  },
  "zh": {
    "subtitle": "令人满足的拧螺丝玩法",
    "description": "将螺丝移到有效空孔以拆除木板的试玩。重点分析移动验证与视觉反馈同步。",
    "architecture": "以数据表示孔位、螺丝和木板依赖。验证后原子更新棋盘模型，由独立视图层播放动画。明确重启与完成状态。",
    "challenges": [
      "快速连点导致移动执行两次",
      "受阻孔位与重叠木板依赖",
      "中断后动画与逻辑状态不一致"
    ],
    "solutions": [
      "锁定当前移动直到状态更新提交",
      "动画前验证占用与依赖",
      "同时重置逻辑与显示层"
    ]
  }
},
  "coffee-please": {
  "vi": {
    "subtitle": "Mô phỏng pha chế và phục vụ cà phê",
    "description": "Demo phục vụ cà phê kết hợp pha chế, đơn hàng và phản hồi hình ảnh. Phân tích tập trung vào chuyển trạng thái nhất quán và vòng lặp mô phỏng gọn nhẹ.",
    "architecture": "Đơn hàng có trạng thái chờ, pha chế, sẵn sàng, đã phục vụ hoặc hết hạn. Lưu công thức dạng dữ liệu, chỉ phát sự kiện UI và điểm số khi đủ điều kiện chuyển trạng thái. Lớp quản lý vòng đời dừng thời gian, âm thanh khi thay đổi hiển thị.",
    "challenges": [
      "Nhiều đơn hàng nhưng không phục vụ hay thưởng trùng",
      "Thể hiện tiến độ rót trong giới hạn render",
      "Khôi phục đơn hàng và thời gian khi quay lại từ nền"
    ],
    "solutions": [
      "Kiểm soát hoàn thành bằng máy trạng thái đơn hàng",
      "Ưu tiên hiệu ứng rót theo kịch bản tái sử dụng và material chung",
      "Dừng và khôi phục mô phỏng từ trạng thái logic"
    ]
  },
  "zh": {
    "subtitle": "冲泡与服务咖啡店模拟",
    "description": "结合制作、订单与视觉反馈的咖啡服务试玩。重点分析可预测状态转换和轻量模拟循环。",
    "architecture": "将订单表示为等待、制作、就绪、已服务或过期。以数据存储配方，通过受保护的转换发出界面和计分事件。生命周期适配器在可见性变化时暂停计时与音频。",
    "challenges": [
      "多笔订单下防止重复服务或奖励",
      "在渲染预算内清晰展示倾倒进度",
      "进入后台后恢复订单与计时器"
    ],
    "solutions": [
      "以显式订单状态机保护完成逻辑",
      "优先复用脚本化倾倒效果与共享材质",
      "从逻辑状态暂停和恢复模拟"
    ]
  }
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
