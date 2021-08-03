import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MovieGridTile = props => {
  return (
    // <View style={styles.gridItem}>
    //   <Text style={styles.title} numberOfLines={2}>
    //     {props.title}
    //   </Text>
    //   {/* <View style={{ ...styles.container, ...{ backgroundColor: 'pink' } }}>
    //   </View> */}
    //   {/* <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
    //   </TouchableCmp> */}
    // </View>
    <View style={styles.gridItem}>
      <View style={{ flex: 2 }}>
        <Image
          style={styles.gridImage}
          source={{
            uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYZGBgaGhweGhocGBwYGB0eHhweHBwaHhwcIS4lHB4rIR8eJjgnKy8xNTU1HyQ7QDszPy40NTEBDAwMEA8QHhISHjQlJCE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQxNDQ0NDE0NDQ0NDQ0PzQ1Mf/AABEIAKMBNgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EADoQAAEDAgQDBgQEBQUBAQAAAAEAAhEDIQQSMUEFUWEicYGRofAGMrHBE9Hh8QcUQnKCIyRSYrKiU//EABgBAQEBAQEAAAAAAAAAAAAAAAACAQME/8QAIBEBAQACAgMBAQEBAAAAAAAAAAECESExAxJBUTJhIv/aAAwDAQACEQMRAD8A8ZQhCAQhCAQhCAAXs3wXw/8ACwdFpAzPzVHd7wMn/wABvkV5JwvBmtWp0hq97W90mCfAXXvQAY2wsLNG3TTSB9kFdxarLoBs0X26j33Kg4rWIiLTMDSBGp6RYW58yFZ8TxLQ2T4SY15xOxn9lk+KY+MwEOcWz1ImHd1j6oI+JxIgt53cd9txeJNh3XhUPEasvPKRv46b7+7qY5rnNBaNW69BaZ0Enbe6qqhAzAum48bHfxQMVXXTaEIBdXEIOrhQhAIQhAIXJRKDqFyUIOlcQgIBdBXEILHBYgyG8z+UX74W7+G8Zz1sD16z4z4nVeatlafhXEC15jQuAA0nWQI5E/Xog9DxdMuyVBOw/wAgDlPTl4DovNPjXA/hYp8fJUAqN3s+7vJ2Yd0L0LhWND2BpNoIMjfmL2Otuiz38QsGTQw9Q6sLqbucG7ZjkWu756ox54hCEaEIQgEIQgEIQgEIQgEIQgEIQEG3/hjw78TEuqkSKLCR/e/stjrGY+HNej8RxAYDsBN+fd4kDyVD/DjB/g4E1SIdWe4g6HKyWDwnOfHza4/xtjCBuZPKbxbY6ny7kFdxV7nOJnLJIg65bwOcD7LPYl7GNzAS7K4E2N9b87xr6WUXE8Xc6HO+YGHN2IuB6EqNh+G1q1wIDjEu7IJibCJJjkOaBvGcQc+wMDK0R3D35lQCVa1cAxk5nE9TDL/2mXnyCiVMkwL22bvyBdeNbwNBZBDldUv+Uc75ab/Un6BTsN8N4h8f6ZaDoXQ0euu/km26qmQthhfgsn5qgHNoEnz0Wi4R8K4Rp7bS522Z0jpZNVm5O68yp0HO+VpPcCVOw/AMS/5aFQ/4GPNe28PwNOmYYxjQeTAFagcvz+i3VPaPIMB/DfFvLS/Ixp1l0uA7hurbG/w2ZTbm/GcdARlA131XpLagA6myb4xRDmsF4LhPfBvy5LLCZV5mPg6ixsOLnEnWwgd0H19FzDfClASXZ3A6DSO4jVehM4aHb9/Pw5eiRieDljgWkR3XNt48dBt3LNRXtWAd8H0WmYeRGhI/LTW6SeA4YDstk7i7h+S2OOwLp7bnDv0GlobY+CrnYGBJdrtpGvPnBWm6ytTh1NgIdTDm87hw9YIUHHcFpgBzTZwsQbA26dYWixLC0kjtW0J12Mcv0VJj6Iy56bog9ph1HWNxPuyaN1Rv4e8SG9rnIv4b8tFCq0ss5muaduS0mCJcZ0V7wbDseSHtDmxP6aWlZybled0mmRBHeTl9TYK1YZHbYScovBm8OkObqY5zvPXWcW+HKDe01uXcttAHS09bnVZJmGBuxzm7wCcs+N1luu2zC5dNNwrEkaOzzlIIF5ItJ00NhrPro+KUxicDVaIc4Mc4DfMztCORtH+R2hecsrVKZl4kGDLYa4RbMDGvfZaz4T4+GmMxcS75HAB5EQdOy+0aRvYWnZWZY2dx5qUK2+JOHihialNvyBxLLR2HdpuvQx3gqpWpCEIQCEIQCEIQCEIQCEIQCn8I4e7EVqdFurzEnRo1c49GiXHoFAAXpvwFgG4bDvxdQQ6oIb/1pgkl3TMW+TRzQXXHMW3C0G0mkhjGNbfXKIAbOznanqV5y8VsW4lrZayZeey1o5ucbT5lW3xHUzVHF/bcXwynmIsJcXvDYjoJB301gVnveA17zkHy02wxje4CxU3KReOGWXTlGnhqPPE1BHyg5AdbTrHO89EnEYuvVa1r3BjBchogmwF4ubWgrtMBohoDR0t66pDyp9q74+GTtBdh2N2Lu828h+aVQrP+YQGixAAETfQbWSq4XOHmHOGxA8wbffz8qxqPJNThdUAYvO0OBkbFO4jiD2iM5IG2gH6/pyWi+GsE00AHNBF/f19FF43gKdJlWOTQJMm4BOuo1XSaea39Zyn8Sua6IJHMGT0tZWWG+JmOIzscz/tq3x5FZvDNa1peRPuFJwlVj3ZYLSekyo969E8ONk3dbeocC4u18seRmAsdnN5g7rT4JpcYFyB4HX9F4bxChXwNbI7MzRwbcWdu2efke8LVcB+Iaohx7dOLOuNYsRfKQPZVy7efLH1rfcTfkIA3MTyMalJfVzOYx3yEOI8WxPm30VM7iTnzla53OPlH+SDinB7HOjLO21jre90rI0NKsWyPMLtTiTWC9zGwk8j3dyocRxgN2EbAn2SqXG8Re7Swg3mPCfYUrWuP400zYT1P2VJWxVSpYOgeg++yqqmOpNPbc9xJgAE0we4AF7vIaph3FMOX5GNqZhrlc+Rl1lpGxnWUF8KboAcJAVRxPDtuW8uVjrLff2UvDYwsiXB7DEOGt9Qdhtf0XcewGYA0PPlz7hPu4ZfBPIBk9PzWg4G+Xnu/L0VE5ga4957t/RWPDMRkzPF9YnrMT9UFl8QYo5X8od5Afc7dVi8M7T372V3xWtNJx5gAff7qhoFRk7+HirKZ9+5UFzQ50XEaEGCpNN9uukLlOjBlc5w9OWPtonG1HVqZa85qlNv+m6BmcwHtNcdTE5hPIxqs8VocRLSHt+YEERrIPvmofEsK2G1afyOMOaRlLHxLmW1brlO4BGoXXHLcePyY+uWlUhBQqcwhCEAhCEAhCEAhCEFhwbAGvWZSH9RueTRdzvBoK9P4ljS1rvw4loysYR2AG5cpvbsg5eWZw71lvgNgptr13NJdDaTADBc55zOa21jDWydg49yex3EC4EPhzrRBlrBeWtg9uZuTodNyZyy0vDC5VTOaWklzsz3EkvvJnXW8LlJyZqEyU5S1XKvVjxdQ4DBSXLrjfvSHm3198kXaYxHNHC6OeoG8wZ7t/RFUqb8PUn5nPY0E2EEwYm8XG8bq8Xn8nLfYJ2RhAtMe/oqz4npvewnKLmZgajUTvpqneEY0VXmmW5HgyW9BsAbzfTktO/hge2HT79/TRdMeY82UuN5eOMZmYWbj7bIwFF4eDBbBmdPJbLjvwq8OzsmeYGv9w37x5LOYllWmLs8RcKdWdPRhlhlq5fHfirij8TVD6jsz8oBOltgIV1/D1mcPY4DKZcO+wPnbyWcwHDKlZ8AEknx/bqvS/hfhQw4vy163t1uSuk6cfJlLbYtaGFY2GgAdNPRRPirFBlJuWLPn09ea5jsVlMi7ifCD9zp3FVfxPScKAed3C3fJvCVEV3DGOrFzjsYnWPC3qnMbVDSIZcGCXlsRAIgDSQTy2VFwvHPovkHsu+YcuoV+8ZyHH+qD5317/eylRji+GZVdTq0mvoV2ADM0NqU3RMSDBBF4sfRQcFhvwHPrOzVq9Qul5AaAXHM5waCcxJvJgX71qMDhbgwDBG0x16JePY2e1sNGiI6XGltkGY4Zhi0vL2nIRcbmdSpf4MtGrp0Gkcgff3mViamYFtgALaqPVJEGPXlraLoKTiFKC42sdvd/HqkcNp58w5CfFd4hUuTFzb2Z5T5J/wCHm9tx2geplBA43QLIZMjWOSqKdirfjlbPVMf0iPf081VuaudvL1YY6xh/Dvhyfq399FDJUprxCjKfXfG8aKczw8PJN4YglzbRUGR0mwJgsfHMOAv1Kf5KI1kgjX5t4uNLnTZMbyjy4yxR1aZaSCIIJBHIgwQkKbxRsVX/ANx6TN5UJd3hCEIQCEIQCEIQCew9Evc1jRLnENA6kgD1KZVlwExXpnkc3L5QXa7G1jsYKDXmm2hQDWi+jZGpuH1BydmGUToG22VO4SVL4niS9xcWhnygMHystcAbXl3eSoTXLhbu7e/GSSSGn05K6xidOiQ7S3rySVXrrkioPzTQfIP3Tjne/fcmHFai008RPVW3BcHnbDHkVR2msuJ6A7HRVTmqx4U+IewQ9gDwf+RHzt8QfyhXHDLir+C+i3EttWpVIeNzcQSNjp4E8l6Bg8TnYx4AyPAPdMHXosa+kP5nKw9jFU8xFozFpl1rTvbcq9+C6xax+Hf89N8c7GSD55vAhVjxUZz2x3+NE9pJy6zpz6FVmK4MxxhzBm5q7sTc3MCdfROuDWghwuQC1wJgg3v4fRW4KClw5tIEMa0E8hfuTbnEd8/RW1V4/VVmLeACf2Hv8lrENlLM9sm2qc+NKH+2H97fuoWFxcvAP/bv1lWfxif9q3q8fQrK2dvNsPREnqtXwrCF9NpDtJB6W19AfHVZfB1Jka3+62Xwo0nO3blHhbrvHepWk4RuQQNdx13H28kYxhIzTm5QZvbbb91MNIAxG066cwI01v0SHV4tqAQQet48d5580FJiaJGsnuMGLQbWdp+qjYmnDZaZb7Jtt+isKv8AdPXkTqfHfvKr8c7LJ3gwdt5b4fboAgy+PfeN59z5fRNUcYac5fmIjoBzPiuV6mao50aADuPsKA98vceRgeGvrKnK6i/HjLlqn2iSSb8+abcxLY8IdJPvxXL69uuDW0LuHdNlwi5CS2xWp6qbNvcqO8TmE7kc9bJ9hzBRyRJnosis+Yr+IQcjry5jZm9xLZ62aPVQVefEmG/CcynEBjdSBmJcXEyY8hsqNdo8F4oQhC1gQhCAQhCAVpwK1Rztm03kjnLcoE7XcLqrVxwyjNKo7/kWM8yXO/8AIWVs7TKrjEDbrdMU6nNSdJ6KK6nf34ri9l40kColbdFGeCF2lVOhTS5l+nSOabLUsuuuB3vxQvJl7ZTnDcV+G9ub5Qc3oQQeYIPoEOco1V43VY3Tl5JuNZgeIAfyT8riGyyxub5bA9Re+6u+FYwMx9Uzla9ma9jPYI8bu81hcJUfTdTMtLGnMzkdD3A+9Vb4XiLn4v8AEYRAbqdxljzkx4Lo4TLiz/Ho9TFgggHlBQOIWIJtcc/BZY4wOuXHwEb959wutxOazHG19Pv+nJdHnaSlj4bDgDcjXrt4KJjIcw/NOoJkSJt36iR+6zoxhYXHPbTUeSfOPgN1c2YBExB1HeJ16+KBsvLHg8j+4Wx+Mac4Np0h7R/8u/JYnFy1t+eu+q3HGml+ABgEgsdvfUH6ysrfryNuI/DeZ2M3tb9l6P8ADGJplk37UTpyj6H0Xm/E6eZ57+ULZ/CVIjDscdZIHUA2PXYeClbUcTbBnyO0DTvCqMQ+CdhNwdtR9PurF1eW6mduXTxuqrEukEbfpqgi1Kuw0IFut790z7CqeJVjkJJ6fr43PiplQn379yqPileRlBmT6bx7+6Cnc/K1zj3x4Kvw5Md90/xevo3xPn+f0UTDvU3p08d5TQU81yaY6QugLnXrhTwm3i6dmU28JDKHcO6DC48Q/wAfr7Kb6pbx77rprlnwjjz8+V4NiXtg/MIcTvqO19uSpFd49jXU5GoIfPR3Zd01DOt1SldZ08ef9VxCELUhCEIBCEIBXvD4FFs//qd9TlbFun3VErzCsP4VO8S979dYawCBveQe49VmXSsP6iTN/evsJFYXSXv15BKJB92/Zcent3skkJqpTi4Tjm8kpvI7oa3xUT8Ug3ulCv7n30XX0kksA1KrhHMD3EqDUYSTdPVsT/S3zTFUWCvGOOeUq04VVDmmk8Ajb8k+7DPpfI4ZXcxy0FteipMPLXNI1my1tJgfSN4IuOnXwMnwVOLnCWVHva1zxfZotHOSe/ZXPFODPptL2vJuA4GBY3Any9FT4R4zAnsmfFsXLef/ACtpqOS1PFiatFxYL5JdrBykE25iCPBbemY/1NqKi2m9kBozNmZIzEixlp0HTrfabLgGEL2Q7WTqdg6x7tPusvXqNY1ryL/iAOgmS2Lj8j1K9D4CGOpMqMcHB52Nm7ZTyI0KzG7nK/LJjbIrOLsDnsaBFwO+8LXYynOEaznl1toCfqFTVaQdjGN2An0/ZW3xC4OY1k6ZnWkQdBp3lV8cvrCM4PnrF39AN9pP/EfmtNhrMhtgBAbEbn9BpOvco1EQLWAjp73KVQxEQ0nbuvHTkPoNlKz4rt0N+RMmf1VbiqlzFz6e/fJHFXiBlP0tpptKU9kNE2kCdu/wQVWJeSeX7E+/c0PEHgPJOgH0V8RMmLAH6rK8XcXOI205afqgpMRWL3Fx3TcwpP8ALT4JhzIQScDUOaNlZlireGMlxPIK2hcsu3t8Mtx5Myh4slPak96ldNtGyUXWSYgpxu4WpIpQdSQT2J2GaWguvoDB8FUVmFrnA6gkHXYxurGp8rhE8vfJR+KM7bn7VCXDf5iSRPMGxXTF5fJOUFCEKnMIQhAIQhA5RpFzg0auIA7yYC1VakxjMjTenmpyTckOcXGIgNLiI16qt+HqUOdVkDLDWzAH4jrN1MWEunaB3p/G1ATDfvcybwflnkpyvx28WPOzLDMobTvbRKNOBIXWyuT0SfpTRNik1XBup09+aRWqlosogBJkrZDLLXEKq4o/0i3M/kmMxNynKpgwE1WMCOf0Vxwyt7tMalSGMmPfu0qO1SsM4Kvrl8PNo3lXHBKsOLTofuPuqpr7KTw9/bG1redlqVrjqeV9tyTPOWmZ65mz4rV/Dj84IOhmPIZvqVkuKVg9gJ+cbb2BzDy/8rS/CjooB86A38YH0VRN4YvjdA0q7qRMtF+/XKea5gMRWw5LqXaYfnY67T3j76q6xOHFXFsD7zmk7wDbyzBaR+GpUwWtYbagtM9x5LJivLySzmc1XcC+ImPqse9uUgEETPdHO60HE+MNvkZnlrdxAPaI8Of2WKxHw6xzpY8sk/KRIHdpHirPhVM0WZDLzmJzeAgRqALJdomto9TilZwcAGsANoGvMSdPL6qx4bRzNJeSXHQnxjx/VRxh8xlwgagBPUXz4W6e4WKWuGptJh2x75A2seh9woPGK18rbknK3S/0/JL/ABAwSDfpz97quGIDqxcdGg+BJgek+aBnidTIwMB7RgePX1WbrsDn9J9BYKy4hXzuLpmNDG+/pbzUX8OL8vfigj/y2/RU+O+cwtA+pDSeU+/qs5WfmJPVGybS+GuAaecqaawVVhqkGDoVIcFzs5evDPWPCUaoSXPlRZSg6Fmm+9p5xSH1IXGvTNY6LZGW8bSqo0eLg6/qkY2jFMgGfw3iLXDXtmJHJw8z3rmHdLS3xCmYUtce2RkIax4zZTBeC0iORutl1dOfkkuO2cQnK1Mtc5rhBaSCORBgptW84QhCAQhKaJQaTDZmUWAAAODnPIMuJeW5RGo7LAQep6qEXS5aH4rqBopU2jshgeDoe00NAMcmsA1M3O6zLD4rnebt6sZ6yQ898bobV+ialGYLNK9qcqOn7qO+tHeitXiwufomKbCTJ1VSOeWXPBymI7RUeoTN1JmTbQad6arNt1WxOU4MhONKbCWtc4k4aXGPfVTqLYeCq/CPhwVrUAGX3stTUrHU5BcNr+Wvorn4axoYw03AxJg/0kaxPONuSiYFocIO/vwSf5GoxwLC2J0MgWHrZbGWLDhDc2Kc47MGgmSX/oVtcXhmAdm8tsYLYMaGdOXmsb8MPeyo9z25Xy2BM9kCxB5G/qthUqk3JmZHXYTK1NU/8oA0yN9R626phobeJnMZOguBBny+y02Eew0nBzAXTLTfndpvpH1WbkNc8cift5ae98piaovg5Tvz20j3+yYrnISAI2j6+qdae0Tv093VdxCuNZ8tNLe+qxbtfGAC+vqT79zrXjOZbMF5k9BfU93qlU2R23ROw5c56p5rYkn5j6DWO82t0QQq7RoNOX3981IZS7P3TNRk+X33U4mRPTXwCDP8U7LTHv8ARUblb8fqGQ2VTBYqR0FSMNWnsnwKjPSGrNbjZlcasnMTZK7TfIuhyl23LNwoFFQWSJQFujfxyhmDpAsDdWFCoGPDiA5s3B0I3FxHoUzhjqE7WFlNvK5j/wA7QuJDMBUvLiQ6YN2gAXG5F1XLRUqYfTqMOuRzm/3MhzT35A5v+Szy6Tp5cpquIQhakLoXEBBq/iC9d42yMDTqMoY0Ad4iD1GypGOhWZd+PRFWBmpZWPjVzXZsryO/sl3MhV9Zu6jrh6bdzcIc9MVHynWRCQ2nedlsRd0ikxOvMdka/ZKaY8Ey0mZTs1qaPgQEw98lOPfZRpSRmWXyBy6CklAK1BbXRdT6eJzQPD6KvldDoIjULUtlgXD7qzLhGU6HvPp72WewGK7N9fXl4q0o1JF9kEuqxzIe06SL7jl3zorJnFgWXIBHMwdNxCgsf17ovzvokVACRIHlfwEWK2VlmxV4+4DKwEk+UaalIp4qo+XOEGbz3Dl4lLFJpJGvr4+/2bYwhxabxpe3imyQ5Ua6xc4X0DZP5Js0fM6aSPsP1unnU+1Jk8zp+pvunHOAsAfKPCY9+KxqKRF4gDQT6k9PDwUbUm6drOgagpqm/S/v9fsg6G6rmKrhjJJ0Anrb35JGIxYbI6e781muJY4vMTZBExdcveXFNhcQsVKS4rrAuBLaEIcDk+x0qPCGvhZY6Y5aO1Vxj0hz5XGJrhu+eEpr4IKkVHkjwUIvSxUJbfbf7KbF45a4WfC6OcnnAGtxn/05A/qMuEd4WdOq0/w5TD3vzaNpPfExdkPbPSRosy8yZ5qo5eXuUhCEKnIIQhBe/Cp/3Ab/AEvpvDhsR+G50HxAPgouq6hRl27YfyihPMQhG4kVvuktQhbGZdku3TKELYjLt1y4hCJKQEIQWvDlfYXdCFrFjS+QeKRS370IQJo6nvP1S3XIm9vzXUIHXmw005BIf8qEIIdRyqsU881xCCsxDze6r3aoQg4FxyEIFU0pyELFzo83RNO1KEIqkJTUIRkONTrtAhCyrxWmBth8Z/ZTHh+O23oPJZwoQkR5O44hCFTm/9k=',
          }}
        />
      </View>
      <View style={styles.gridText}>
        <Text>Saw1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd',
  },
  gridImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  gridText: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MovieGridTile;