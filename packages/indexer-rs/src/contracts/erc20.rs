use crate::{
    contract::{Contract, ContractType},
    eth_rpc::Chain,
    GroupType,
};

pub fn erc20_contracts() -> Vec<Contract> {
    vec![
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce".to_string(),
            name: "Shiba Inu".to_string(),
            deployed_block: 10569013,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "shib".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x1151cb3d861920e07a38e03eead12c32178567f6".to_string(),
            name: "Bonk".to_string(),
            deployed_block: 16628745,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "BONK".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x6b431b8a964bfcf28191b07c91189ff4403957d0".to_string(),
            name: "CorgiAI".to_string(),
            deployed_block: 18540899,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "corgiai".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x6982508145454ce325ddbe47a25d4ec3d2311933".to_string(),
            name: "Pepe".to_string(),
            deployed_block: 17046105,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "pepe".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e".to_string(),
            name: "FLOKI".to_string(),
            deployed_block: 14029867,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "floki".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xb131f4a55907b10d1f0a50d8ab8fa09ec342cd74".to_string(),
            name: "Memecoin".to_string(),
            deployed_block: 18429439,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "meme".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xb9f599ce614feb2e1bbe58f180f370d05b39344e".to_string(),
            name: "PepeFork".to_string(),
            deployed_block: 19117207,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "pork".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xac57de9c1a09fec648e93eb98875b212db0d460b".to_string(),
            name: "Baby Doge Coin".to_string(),
            deployed_block: 13570063,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "babydoge".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x576e2bed8f7b46d34016198911cdf9886f78bea7".to_string(),
            name: "MAGA".to_string(),
            deployed_block: 17894408,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "trump".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x761d38e5ddf6ccf6cf7c55759d5210750b5d60f3".to_string(),
            name: "Dogelon Mars".to_string(),
            deployed_block: 12293419,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "elon".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x12970e6868f88f6557b76120662c1b3e50a646bf".to_string(),
            name: "Milady Meme Coin".to_string(),
            deployed_block: 17208204,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "ladys".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x72e4f9f808c49a2a61de9c5896298920dc4eeea9".to_string(),
            name: "HarryPotterObamaSonic10Inu (ETH)".to_string(),
            deployed_block: 17228251,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "bitcoin".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xc5fb36dd2fb59d3b98deff88425a3f425ee469ed".to_string(),
            name: "Dejitaru Tsuka".to_string(),
            deployed_block: 14845791,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "tsuka".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x27c70cd1946795b66be9d954418546998b546634".to_string(),
            name: "Doge Killer".to_string(),
            deployed_block: 10778241,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "leash".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xbaac2b4491727d78d2b78815144570b9f2fe8899".to_string(),
            name: "The Doge NFT".to_string(),
            deployed_block: 13130302,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "dog".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xa2b4c0af19cc16a6cfacce81f192b024d625817d".to_string(),
            name: "Kishu Inu".to_string(),
            deployed_block: 12260512,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "kishu".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xa35923162c49cf95e6bf26623385eb431ad920d3".to_string(),
            name: "Turbo".to_string(),
            deployed_block: 17149228,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "turbo".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x7f792db54b0e580cdc755178443f0430cf799aca".to_string(),
            name: "Volt Inu".to_string(),
            deployed_block: 17236595,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "volt".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x5026f006b85729a8b14553fae6af249ad16c9aab".to_string(),
            name: "Wojak".to_string(),
            deployed_block: 17069315,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "wojak".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xba386a4ca26b85fd057ab1ef86e3dc7bdeb5ce70".to_string(),
            name: "Jesus Coin".to_string(),
            deployed_block: 17118237,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "jesus".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x562e362876c8aee4744fc2c6aac8394c312d215d".to_string(),
            name: "Optimus AI".to_string(),
            deployed_block: 16467561,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "opti".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x43d7e65b8ff49698d9550a7f315c87e67344fb59".to_string(),
            name: "Shiba Saga".to_string(),
            deployed_block: 17972295,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "shia".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x9e20461bc2c4c980f62f1b279d71734207a6a356".to_string(),
            name: "OmniCat".to_string(),
            deployed_block: 18831524,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "omni".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x7d8146cf21e8d7cbe46054e01588207b51198729".to_string(),
            name: "BOB Token".to_string(),
            deployed_block: 17083228,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "bob".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xa71d0588eaf47f12b13cf8ec750430d21df04974".to_string(),
            name: "Shiba Predator".to_string(),
            deployed_block: 14396702,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "qom".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x6bc40d4099f9057b23af309c08d935b890d7adc0".to_string(),
            name: "SnailBrook".to_string(),
            deployed_block: 17088430,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "snail".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x32b86b99441480a7e5bd3a26c124ec2373e3f015".to_string(),
            name: "Bad Idea AI".to_string(),
            deployed_block: 17197271,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "bad".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xf05897cfe3ce9bbbfe0751cbe6b1b2c686848dcb".to_string(),
            name: "CateCoin".to_string(),
            deployed_block: 16938223,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "cate".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xb62e45c3df611dce236a6ddc7a493d79f9dfadef".to_string(),
            name: "Wall Street Memes".to_string(),
            deployed_block: 17372057,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "wsm".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x61a35258107563f6b6f102ae25490901c8760b12".to_string(),
            name: "Kitty Inu".to_string(),
            deployed_block: 17302150,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "kitty".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xafcdd4f666c84fed1d8bd825aa762e3714f652c9".to_string(),
            name: "Vita Inu".to_string(),
            deployed_block: 14990356,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "vinu".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xfad45e47083e4607302aa43c65fb3106f1cd7607".to_string(),
            name: "Hoge Finance".to_string(),
            deployed_block: 11809212,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "hoge".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x4ed4e862860bed51a9570b96d89af5e1b0efefed".to_string(),
            name: "Degen".to_string(),
            deployed_block: 8925894,
            chain: Chain::Base,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "degen".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x8ed97a637a790be1feff5e888d43629dc05408f6".to_string(),
            name: "Non-Playable Coin".to_string(),
            deployed_block: 17798474,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "npc".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x4200000000000000000000000000000000000042".to_string(),
            name: "OP".to_string(),
            deployed_block: 6490467,
            chain: Chain::Optimism,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "op".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xaaee1a9723aadb7afa2810263653a34ba2c21c7a".to_string(),
            name: "Mog Coin".to_string(),
            deployed_block: 17731591,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "mog".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984".to_string(),
            name: "Uniswap".to_string(),
            deployed_block: 10861674,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "uni".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x470c8950c0c3aa4b09654bc73b004615119a44b5".to_string(),
            name: "Kizuna".to_string(),
            deployed_block: 18265095,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "kizuna".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2".to_string(),
            name: "MKR".to_string(),
            deployed_block: 4620855,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "mkr".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xd8fa690304d2b2824d918c0c7376e2823704557a".to_string(),
            name: "SquidGrow".to_string(),
            deployed_block: 17157845,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "squidgrow".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x49642110b712c1fd7261bc074105e9e44676c68f".to_string(),
            name: "DinoLFG".to_string(),
            deployed_block: 15948828,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "dino".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x12b6893ce26ea6341919fe289212ef77e51688c8".to_string(),
            name: "Tamadoge".to_string(),
            deployed_block: 15217184,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "tama".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xdfdb7f72c1f195c5951a234e8db9806eb0635346".to_string(),
            name: "Feisty Doge NFT".to_string(),
            deployed_block: 13056457,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "nfd".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x7b744eea1deca2f1b7b31f15ba036fa1759452d7".to_string(),
            name: "El Hippo".to_string(),
            deployed_block: 17911824,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "hipp".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xff836a5821e69066c87e268bc51b849fab94240c".to_string(),
            name: "Real Smurf Cat".to_string(),
            deployed_block: 18129682,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "шайлушай".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x2598c30330d5771ae9f983979209486ae26de875".to_string(),
            name: "Any Inu".to_string(),
            deployed_block: 18894536,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "ai".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xfb130d93e49dca13264344966a611dc79a456bc5".to_string(),
            name: "DogeGF".to_string(),
            deployed_block: 12510443,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "dogegf".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x0d505c03d30e65f6e9b4ef88855a47a89e4b7676".to_string(),
            name: "Zoomer".to_string(),
            deployed_block: 17594376,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "zoomer".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xf538296e7dd856af7044deec949489e2f25705bc".to_string(),
            name: "Illumicati".to_string(),
            deployed_block: 18513639,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "milk".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x005d1123878fc55fbd56b54c73963b234a64af3c".to_string(),
            name: "Kiba Inu".to_string(),
            deployed_block: 14320884,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "kiba".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x8ee325ae3e54e83956ef2d5952d3c8bc1fa6ec27".to_string(),
            name: "Fable Of The Dragon".to_string(),
            deployed_block: 15787768,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "tyrant".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x514910771af9ca656af840dff83e8264ecf986ca".to_string(),
            name: "LINK".to_string(),
            deployed_block: 4281611,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "link".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x912ce59144191c1204e64559fe8253a0e49e6548".to_string(),
            name: "ARB".to_string(),
            deployed_block: 70398215,
            chain: Chain::Arbitrum,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "arb".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x76e222b07c53d28b89b0bac18602810fc22b49a8".to_string(),
            name: "Joe Coin".to_string(),
            deployed_block: 18329212,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "joe".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x03049b395147713ae53c0617093675b4b86dde78".to_string(),
            name: "BobaCat".to_string(),
            deployed_block: 18112540,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "psps".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xa9d54f37ebb99f83b603cc95fc1a5f3907aaccfd".to_string(),
            name: "Pikaboss".to_string(),
            deployed_block: 16628745,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "pika".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x02e7f808990638e9e67e1f00313037ede2362361".to_string(),
            name: "KiboShib".to_string(),
            deployed_block: 16140853,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "KIBSHI".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3".to_string(),
            name: "Ondo".to_string(),
            deployed_block: 14670968,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "ondo".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x58cb30368ceb2d194740b144eab4c2da8a917dcb".to_string(),
            name: "Zyncoin".to_string(),
            deployed_block: 18665578,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "zyn".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xe3dbc4f88eaa632ddf9708732e2832eeaa6688ab".to_string(),
            name: "Arbius".to_string(),
            deployed_block: 19215261,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "aius".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44".to_string(),
            name: "Wrapped TAO".to_string(),
            deployed_block: 1652160,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "wTAO".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32".to_string(),
            name: "Lido".to_string(),
            deployed_block: 11473216,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "ldo".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xb8a87405d9a4f2f866319b77004e88dff66c0d92".to_string(),
            name: "Sora".to_string(),
            deployed_block: 19235060,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "sora".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x24fcfc492c1393274b6bcd568ac9e225bec93584".to_string(),
            name: "Heroes of Mavia".to_string(),
            deployed_block: 18709570,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "mavia".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x710287d1d39dcf62094a83ebb3e736e79400068a".to_string(),
            name: "enqAI".to_string(),
            deployed_block: 18569660,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "enqai".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x15e6e0d4ebeac120f9a97e71faa6a0235b85ed12".to_string(),
            name: "SatoshiVM".to_string(),
            deployed_block: 18983993,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "savm".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x163f8c2467924be0ae7b5347228cabf260318753".to_string(),
            name: "Worldcoin".to_string(),
            deployed_block: 17714705,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "wld".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0xf4fbc617a5733eaaf9af08e1ab816b103388d8b6".to_string(),
            name: "Glow".to_string(),
            deployed_block: 18809233,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "glw-beta".to_string(),
        },
        Contract {
            id: 0,
            contract_type: ContractType::ERC20,
            address: "0x38e68a37e401f7271568cecaac63c6b1e19130b4".to_string(),
            name: "Banana".to_string(),
            deployed_block: 18135851,
            chain: Chain::Mainnet,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            symbol: "banana".to_string(),
        },
        Contract {
            id: 0,
            address: "0xa0c05e2eed05912d9eb76d466167628e8024a708".to_string(),
            symbol: "ticker".to_string(),
            name: "Ticker".to_string(),
            chain: Chain::Base,
            deployed_block: 11962318,
            target_groups: vec![GroupType::Ticker],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe".to_string(),
            symbol: "higher".to_string(),
            name: "Higher".to_string(),
            chain: Chain::Base,
            deployed_block: 11604028,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4".to_string(),
            symbol: "TOSHI".to_string(),
            name: "Toshi".to_string(),
            chain: Chain::Base,
            deployed_block: 5037210,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50".to_string(),
            symbol: "MOCHI".to_string(),
            name: "Mochi".to_string(),
            chain: Chain::Base,
            deployed_block: 6382775,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x6921B130D297cc43754afba22e5EAc0FBf8Db75b".to_string(),
            symbol: "doginme".to_string(),
            name: "doginme".to_string(),
            chain: Chain::Base,
            deployed_block: 10149949,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0xE1aBD004250AC8D1F199421d647e01d094FAa180".to_string(),
            symbol: "ROOST".to_string(),
            name: "Roost Coin".to_string(),
            chain: Chain::Base,
            deployed_block: 12347238,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x181E7f2F2a096E3E3c867d92d1ca0D8c849D2869".to_string(),
            symbol: "MSEEK".to_string(),
            name: "Meeseeks".to_string(),
            chain: Chain::Base,
            deployed_block: 12338214,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x532f27101965dd16442E59d40670FaF5eBB142E4".to_string(),
            symbol: "BRETT".to_string(),
            name: "Brett".to_string(),
            chain: Chain::Base,
            deployed_block: 10983962,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x347F500323D51E9350285Daf299ddB529009e6AE".to_string(),
            symbol: "BLERF".to_string(),
            name: "BLERF".to_string(),
            chain: Chain::Base,
            deployed_block: 12216496,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0xfEA9DcDc9E23a9068bF557AD5b186675C61d33eA".to_string(),
            symbol: "BSHIB".to_string(),
            name: "Based Shiba Inu".to_string(),
            chain: Chain::Base,
            deployed_block: 11786193,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
        Contract {
            id: 0,
            address: "0x9A3b7959e998BF2B50EF1969067D623877050D92".to_string(),
            symbol: "PBB".to_string(),
            name: "PEPE BUT BLUE".to_string(),
            chain: Chain::Base,
            deployed_block: 11916350,
            target_groups: vec![GroupType::EarlyHolder, GroupType::Whale],
            contract_type: ContractType::ERC20,
        },
    ]
}
